_G.TSCPriceDataAPI = _G.TSCPriceDataAPI or {}
_G.isTesting = false  -- Enables chunk/loaded chat messages from data files
local TSCPriceDataAPI = _G.TSCPriceDataAPI

local function getServerPriceData()
    local worldName = GetWorldName()
    if worldName == "XB1live" or worldName == "NA Megaserver" then
        return _G.TSCPriceDataXBNA and _G.TSCPriceDataXBNA.priceData or {}
    elseif worldName == "XB1live-eu" then
        return _G.TSCPriceDataXBEU and _G.TSCPriceDataXBEU.priceData or {}
    elseif worldName == "PS4live" then
        return _G.TSCPriceDataPSNA and _G.TSCPriceDataPSNA.priceData or {}
    elseif worldName == "PS4live-eu" then
        return _G.TSCPriceDataPSEU and _G.TSCPriceDataPSEU.priceData or {}
    end
    return {}
end

local function getServerLoadingSentinel()
    local worldName = GetWorldName()
    if worldName == "XB1live" or worldName == "NA Megaserver" then
        return _G.TSCPriceDataXBNA and _G.TSCPriceDataXBNA.LOADING_SENTINEL
    elseif worldName == "XB1live-eu" then
        return _G.TSCPriceDataXBEU and _G.TSCPriceDataXBEU.LOADING_SENTINEL
    elseif worldName == "PS4live" then
        return _G.TSCPriceDataPSNA and _G.TSCPriceDataPSNA.LOADING_SENTINEL
    elseif worldName == "PS4live-eu" then
        return _G.TSCPriceDataPSEU and _G.TSCPriceDataPSEU.LOADING_SENTINEL
    end
    return nil
end

local function getServerReferenceDate()
    local worldName = GetWorldName()
    if worldName == "XB1live" or worldName == "NA Megaserver" then
        return _G.TSCPriceDataXBNA and _G.TSCPriceDataXBNA.referenceDate
    elseif worldName == "XB1live-eu" then
        return _G.TSCPriceDataXBEU and _G.TSCPriceDataXBEU.referenceDate
    elseif worldName == "PS4live" then
        return _G.TSCPriceDataPSNA and _G.TSCPriceDataPSNA.referenceDate
    elseif worldName == "PS4live-eu" then
        return _G.TSCPriceDataPSEU and _G.TSCPriceDataPSEU.referenceDate
    end
    return nil
end

TSCPriceDataAPI.priceData = getServerPriceData()
TSCPriceDataAPI.referenceDate = getServerReferenceDate()
local _loadingSentinel = getServerLoadingSentinel()
TSCPriceDataAPI.LOADING = _loadingSentinel

-- Start loading when player is in world (GetWorldName() is valid). Single trigger for all platforms.
local function tryStartLoading()
    local worldName = GetWorldName()
    if (worldName == "XB1live" or worldName == "NA Megaserver") and _G.TSCPriceDataXBNA and _G.TSCPriceDataXBNA.startLoading then
        _G.TSCPriceDataXBNA.startLoading()
    elseif worldName == "XB1live-eu" and _G.TSCPriceDataXBEU and _G.TSCPriceDataXBEU.startLoading then
        _G.TSCPriceDataXBEU.startLoading()
    elseif worldName == "PS4live" and _G.TSCPriceDataPSNA and _G.TSCPriceDataPSNA.startLoading then
        _G.TSCPriceDataPSNA.startLoading()
    elseif worldName == "PS4live-eu" and _G.TSCPriceDataPSEU and _G.TSCPriceDataPSEU.startLoading then
        _G.TSCPriceDataPSEU.startLoading()
    end
end

EVENT_MANAGER:RegisterForEvent("TSCPriceDataAPI", EVENT_PLAYER_ACTIVATED, function(_, _)
    EVENT_MANAGER:UnregisterForEvent("TSCPriceDataAPI", EVENT_PLAYER_ACTIVATED)
    tryStartLoading()
end)

-- Parse 18-value lazy format: quality triples (1-15), legacy triple (16-18).
-- qualityIndex is 1-5. Returns (avg, min, max, fromLegacy, legacyAvg, legacyMin, legacyMax).
local function parseQualityFromEntry(dataString, qualityIndex)
    local values = {}
    for v in string.gmatch(dataString, "([^,]+)") do
        values[#values + 1] = v
    end
    local legacyAvg = (values[16] and values[16] ~= "-" and tonumber(values[16])) or nil
    local legacyMin = (values[17] and values[17] ~= "-" and tonumber(values[17])) or nil
    local legacyMax = (values[18] and values[18] ~= "-" and tonumber(values[18])) or nil
    local baseIndex = (qualityIndex - 1) * 3 + 1
    local avgStr = values[baseIndex]
    local minStr = values[baseIndex + 1]
    local maxStr = values[baseIndex + 2]
    if avgStr and avgStr ~= "-" and tonumber(avgStr) then
        return tonumber(avgStr), tonumber(minStr), tonumber(maxStr), false, legacyAvg, legacyMin, legacyMax
    end
    local legAvg = values[16]
    local legMin = values[17]
    local legMax = values[18]
    if legAvg and legAvg ~= "-" and tonumber(legAvg) then
        return tonumber(legAvg), tonumber(legMin), tonumber(legMax), true, legacyAvg, legacyMin, legacyMax
    end
    return nil, nil, nil, false, legacyAvg, legacyMin, legacyMax
end

function TSCPriceDataAPI:FormatItemName(itemLink)
    local itemName = GetItemLinkName(itemLink)

    -- Strip ZOS formatting suffixes in one pass
    itemName = string.gsub(itemName, "|H[^|]*|h", "")

    -- Remove anything after the ^ symbol
    itemName = string.gsub(itemName, "%^.*$", "")

    -- Trim any trailing whitespace
    itemName = string.gsub(itemName, "%s+$", "")

    return itemName
end

function TSCPriceDataAPI:GetPrice(itemLink)
    if itemLink == nil then return nil, nil end
    if type(itemLink) ~= "string" then return nil, nil end

    local itemId = GetItemLinkItemId(itemLink)
    if not itemId then return nil, nil end

    local data = self.priceData and self.priceData[itemId]
    if data == _loadingSentinel then
        return TSCPriceDataAPI.LOADING, nil
    end
    if data == nil then return nil, nil end

    if type(data) == "string" then
        local quality = GetItemLinkQuality(itemLink)  -- 0-4
        local qualityIndex = (quality and quality >= 0) and (quality + 1) or 1
        qualityIndex = math.max(1, math.min(5, qualityIndex))
        local avgPrice, _, _, fromLegacy = parseQualityFromEntry(data, qualityIndex)
        if avgPrice then
            return avgPrice, fromLegacy
        end
    end
    return nil, nil
end

function TSCPriceDataAPI:GetItemData(itemLink)
    if itemLink == nil then return nil end
    if type(itemLink) ~= "string" then return nil end

    local itemId = GetItemLinkItemId(itemLink)
    if not itemId then return nil end

    local data = self.priceData and self.priceData[itemId]
    if data == _loadingSentinel then
        return TSCPriceDataAPI.LOADING
    end
    if data == nil then return nil end

    if type(data) == "string" then
        local quality = GetItemLinkQuality(itemLink)  -- 0-4
        local qualityIndex = (quality and quality >= 0) and (quality + 1) or 1
        qualityIndex = math.max(1, math.min(5, qualityIndex))
        local avgPrice, commonMin, commonMax, fromLegacy, legacyAvg, legacyMin, legacyMax = parseQualityFromEntry(data, qualityIndex)
        if avgPrice then
            return {
                avgPrice = avgPrice,
                commonMin = commonMin,
                commonMax = commonMax,
                fromLegacy = fromLegacy,
                legacyAvg = legacyAvg,
                legacyMin = legacyMin,
                legacyMax = legacyMax
            }
        end
    end
    return nil
end
