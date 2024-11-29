--Would like to have a function someone can call where they pass in a Control and some Data, and we fill that control with a QRCode representing that Data.
LibQRCode = LibQRCode or {}
local lib = LibQRCode

lib.name = "LibQRCode"
lib.version = 1
lib.svVersion = 0

local MAJOR, MINOR = lib.name, lib.version

local floatingWindow = nil
local qrContainer = nil

--Since we anticipate needing to draw more than one QRCode between UI Reloads, we'll maintain a cache of which texture controls we've
--created for which input parent controls.  In this manner, we can have multiple separate QR Codes visible at once if needed, and
--they'll be tied to a given parent control.  When we generate a new QR code, first look up the parent control by name,
--if we've used it then grab those controls first, and only create new Controls if the QR Code requires more than what we
--have available.  Be sure to set unused ones to hidden (e.g. if we previously had a 32x32 matrix, but now we only need a 21x21 matrix,
--there will be 583 controls left over that we don't want to be visible any longer).
local controlCache = {}

local function GetCacheForParent(parentName)
	local parentCache = nil
	for key,tab in pairs(controlCache) do
		if key == parentName then
			parentCache = tab
			break
		end
	end
	if parentCache == nil then
		parentCache = {}
		controlCache[parentName] = parentCache
	end
	return parentCache
end

--We'd like to leave a border of at least one white "pixel" (however big we decide a pixel is) so that the QRCode can be cleanly detected.  Remove distortion so that if parentX and Y are not the same, we still have square pixels
local function GetPixelSize(parentX, parentY, rowcount, colcount)

	--however many columns we have, we want to split the parentX into that many columns Plus 2.
	--Same with rows, split parentY into that many rows Plus 2.  This will give at least one pixel border
	local pxX = parentX / (colcount+2)
	local pxY = parentY / (rowcount+2)
	
	--attempt to remove distortion by making the pixels square, simply take the smaller of the two
	return math.min(pxX, pxY)
end

local function GetOrCreatePixelControl(parentControl, pxControlNum, parentCache, cacheSize, pxSize)
	local px = nil
	if pxControlNum <= cacheSize then
		px = parentCache[pxControlNum]
	else
		px = WINDOW_MANAGER:CreateControl(nil, parentControl, CT_TEXTURE)
		px:SetDrawTier(DT_HIGH)
		parentCache[pxControlNum] = px
	end
	px:SetHidden(false)
	px:SetDimensions(pxSize, pxSize)
	return px
end

function LibQRCode.CreateQRControl(size, data)
	local control = WINDOW_MANAGER:CreateControl(nil, GuiRoot, CT_TEXTURE)
	--Draw Tier for the control should be low, we set the background to blank white, then draw the QR Code on top, and the background
	--acts as a ring of white pixels around the QR Code for ease-of-detection
	control:SetDrawTier(DT_LOW)
	control:SetDimensions(size, size)
	LibQRCode.DrawQRCode(control, data)
	return control
end

local function DrawQRCodeWithIndividualTextures(control, qr_table)

	local parentName = control:GetName()
	local colcount = #qr_table
	local rowcount = #qr_table[1]
	--d("Generated QRCode has " .. rowcount .. " rows and " .. colcount .. " columns")
	local parentX, parentY = control:GetDimensions()
	--place a white border around the QRCode for easy detection
	local pxSize = GetPixelSize(parentX, parentY, rowcount, colcount)
	--center the QRCode by adding X or Y offsets, depending on which way we adjust.
	--the offset should be half the distance that is removed by shrinking whichever dimension(s) we shrank.

	local yOffset = (parentY - (pxSize * rowcount)) / 2
	local xOffset = (parentX - (pxSize * colcount)) / 2
	--set the background to white
	control:SetColor(1, 1, 1, 1)
	--keep track of where we are in the cache, so we know if we need to make new Controls or reuse old ones.
	local pxControlNum = 1
	local parentCache = GetCacheForParent(parentName)
	local cacheSize = #parentCache
	--The table that comes out of qrcode() has columns first instead of rows first.
	--and yes, this for loop starts with "colnum" not "column".  Col Num.
	for colnum,col_array in ipairs(qr_table) do
		for rownum,cellValue in ipairs(col_array) do
			if cellValue > 0 then
				local px = GetOrCreatePixelControl(control, pxControlNum, parentCache, cacheSize, pxSize)
				px:SetAnchor(TOPLEFT, control, TOPLEFT, xOffset+(rownum-1)*pxSize, yOffset+(colnum-1)*pxSize)
				px:SetColor(nil)
				pxControlNum = pxControlNum + 1
			else
				--there is no need to draw a white pixel, the background of the QRCode is already white.
				--px:SetColor(1, 1, 1, 1)
			end
			
		end
	end
	--hide any extra pixel controls
	for i=pxControlNum+1,#parentCache do
		local px = parentCache[i]
		if px then
			px:SetHidden(true)
		end
	end
end

--Control should be a TextureControl
--data should be a string
function LibQRCode.DrawQRCode(control, data)
	if control:GetType() ~= CT_TEXTURE then
		error("Expected a ControlTexture (Type="..CT_TEXTURE.."), but found Type="..control:GetType())
	end
	local ok, qr_table = qrcode(data)
	if ok then
		DrawQRCodeWithIndividualTextures(control, qr_table)
	else
		d("failed to generate qr code from input data")
	end
end

local function DrawQRCode_Floating(data)
	if floatingWindow == nil then
		--Create a basic window to hold the QR code
		floatingWindow = WINDOW_MANAGER:CreateTopLevelWindow("LibQRCodeWindow")
		--these dimensions will make the QRCode a square accounting for the headers and offsets in the window.
		floatingWindow:SetDimensions(210, 245)
		floatingWindow:SetAnchor(CENTER)
		floatingWindow:SetMovable(true)
		floatingWindow:SetMouseEnabled(true)
		floatingWindow:SetClampedToScreen(true)
		--make a simple window title
		local header = WINDOW_MANAGER:CreateControl("LibQRWindowTitle", floatingWindow, CT_LABEL)
		header:SetText("LibQRCode")
		header:SetHorizontalAlignment(TEXT_ALIGN_CENTER)
		header:SetDimensions(200, 30)
		header:SetColor(0.5, 0.5, 1, 1) -- a nice blue color
		header:SetAnchor(TOP, floatingWindow, TOP, 0, 5)
		header:SetFont("ZoFontAnnounceMedium")
		--attach a backdrop to make the window easy to move around.
		local backdrop = WINDOW_MANAGER:CreateControlFromVirtual("LibQRCodeBackdrop", floatingWindow, "ZO_DefaultBackdrop")
		backdrop:SetAnchorFill()
		backdrop:SetDrawTier(DT_LOW)
		--Make a close button for the window, put it in the top right of the window
		local closeButton = WINDOW_MANAGER:CreateControl("LibQRCodeCloseButton", floatingWindow, CT_BUTTON)
		closeButton:SetDimensions(30, 30)
		closeButton:SetAnchor(TOPRIGHT, floatingWindow, TOPRIGHT, 5, 5)
		closeButton:SetHandler("OnClicked", function() 
			SCENE_MANAGER:ToggleTopLevel(floatingWindow) 
			floatingWindow:SetHidden(true) 
		end)
		closeButton:SetEnabled(true)
		closeButton:SetNormalTexture("EsoUI/Art/Buttons/closebutton_up.dds")
		closeButton:SetPressedTexture("EsoUI/Art/Buttons/closebutton_down.dds")
		closeButton:SetMouseOverTexture("EsoUI/Art/Buttons/closebutton_mouseover.dds")
		closeButton:EnableMouseButton(MOUSE_BUTTON_INDEX_LEFT, true)
		--Draw the QRCode in a section of the window that doesn't include the close button, but includes the rest of the window below it
		
	else
		SCENE_MANAGER:ToggleTopLevel(floatingWindow) 
		floatingWindow:SetHidden(false) 
	end
	
	qrContainer = LibQRCode.CreateQRControl(200, data)
	--WINDOW_MANAGER:CreateControl("LibQRCodeDrawing", floatingWindow, CT_TEXTURE)
	qrContainer:SetParent(floatingWindow)
	qrContainer:SetAnchor(TOPLEFT, floatingWindow, TOPLEFT, 5, 40)
	qrContainer:SetAnchor(BOTTOMRIGHT, floatingWindow, BOTTOMRIGHT, -5, -5)
end

local function DrawQRCode_FloatingTest(n)
	local data = ""
	for i=1000,1000+n do
		data = data..i
	end
	DrawQRCode_Floating(data)
end

SLASH_COMMANDS["/qrcode"] = DrawQRCode_Floating
--SLASH_COMMANDS["/qrcodetest"] = DrawQRCode_FloatingTest

--Addon loaded function
local function OnLibraryLoaded(event, name)
	if name ~= MAJOR then return end
	EVENT_MANAGER:UnregisterForEvent(MAJOR, EVENT_ADD_ON_LOADED)
end

--Load the addon now
EVENT_MANAGER:UnregisterForEvent(MAJOR, EVENT_ADD_ON_LOADED)
EVENT_MANAGER:RegisterForEvent(MAJOR, EVENT_ADD_ON_LOADED, OnLibraryLoaded)