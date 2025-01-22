<script setup lang="ts">
import { getGeocodingSearch } from '@/data/geocoding-api'
import type { GeocodingResponse, Point } from '@/models/geo'
import { Icon } from '@iconify/vue'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from 'radix-vue'
import { ref } from 'vue'

interface GeocodedInputProps {
  onChange: (point: Point) => void
}
const { onChange } = defineProps<GeocodedInputProps>()
const selected = ref<GeocodingResponse | undefined>()
const options = ref<GeocodingResponse[]>([])

const handleInputFocus = () => {
  selected.value = undefined
  options.value = []
}

const handleInputChange = async (event: Event) => {
  const { value } = <HTMLInputElement>event.target
  const { data } = await getGeocodingSearch(value)

  options.value = data
}

const handleOptionSelected = (option: GeocodingResponse) => {
  onChange({ latitude: Number(option.lat), longitude: Number(option.lon) })
}
</script>

<template>
  <ComboboxRoot
    v-model="selected"
    :display-value="(selected) => selected.name || selected.display_name"
    @update:model-value="handleOptionSelected"
    class="GeocodedInputRoot"
  >
    <ComboboxAnchor class="GeocodedInputAnchor">
      <Icon icon="radix-icons:magnifying-glass" />
      <ComboboxInput
        class="GeocodedInput"
        placeholder="Search for a place..."
        @focus="handleInputFocus"
        @change="handleInputChange"
      />
      <ComboboxTrigger>
        <Icon icon="radix-icons:chevron-down" class="GeocodedInputIcon" />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent class="GeocodedInputContent">
      <ComboboxViewport class="GeocodedInputViewport">
        <ComboboxEmpty class="GeocodedInputEmpty" />

        <ComboboxGroup>
          <ComboboxItem
            v-for="option in options"
            :key="Number(option.osm_id)"
            :value="option"
            class="GeocodedInputItem"
          >
            <Icon class="GeocodedInputItemIcon" icon="radix-icons:sewing-pin" />
            <div class="GeocodedInputItemValue">
              <div class="GeocodedInputItemNameWrapper">
                <span class="GeocodedInputItemName">
                  {{ option.name }}
                </span>
              </div>
              <div class="GeocodedInputItemDisplayNameWrapper">
                <span class="GeocodedInputItemDisplayName">
                  {{ option.display_name }}
                </span>
              </div>
            </div>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>

<style>
@import '@radix-ui/colors/black-alpha.css';
@import '@radix-ui/colors/mauve.css';
@import '@radix-ui/colors/grass.css';

/* reset */
button,
input {
  all: unset;
}

.GeocodedInputRoot {
  position: relative;
}

.GeocodedInputAnchor {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  line-height: 1;
  height: 35px;
  width: 100%;
  padding: 0 15px;
  background-color: #ffffff;
  border-radius: 5px;
}
.GeocodedInputAnchor:hover {
  background-color: #eeeeee;
}

.GeocodedInput {
  height: 100%;
  width: 100%;
  margin: 0 5px;
  background-color: transparent;
  color: #000000;
}

.GeocodedInputIcon {
  width: 16px;
  height: 16px;
  color: #555555;
}

.GeocodedInputContent {
  z-index: 10;
  width: 100%;
  position: absolute;
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  margin-top: 8px;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
}

.GeocodedInputViewport {
  padding: 5px;
}

.GeocodedInputEmpty {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  color: #888888;
}

.GeocodedInputItemIcon {
  min-width: 15px;
  min-height: 15px;
}

.GeocodedInputItem {
  max-width: 100%;
  line-height: 1;
  color: #000000;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 50px;
  position: relative;
}
.GeocodedInputItemValue {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  max-width: 100%;
  justify-content: center;
}

.GeocodedInputItemNameWrapper {
  max-width: 100%;
}
.GeocodedInputItemName {
  font-weight: bold;
  font-size: 14px;
}

.GeocodedInputItemDisplayNameWrapper {
  max-width: 100%;
  display: inline-flex;
  align-items: start;
}
.GeocodedInputItemDisplayName {
  display: inline-block;
  height: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  align-items: start;
  max-width: 100%;
}
.GeocodedInputItem[data-disabled] {
  color: #999999;
  pointer-events: none;
}
.GeocodedInputItem[data-highlighted] {
  outline: none;
  background-color: #dddddd;
}
.GeocodedInputItemIndicator {
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
