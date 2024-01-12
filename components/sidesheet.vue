<script setup lang="ts">
/** Props */
import type { SideSheetProps } from "./sidesheetProp";

const props = withDefaults(defineProps<SideSheetProps>(), {
  title: "",
  outsideClose: true,
  closeButton: true,
  animation: "slide-to-left",
  heightAuto: false,
});

const emit = defineEmits<{
  (event: "onClose", payload: boolean): void;
}>();
const isOpen = ref(props.status);
const handleClose = () => {
  isOpen.value = !isOpen.value;
  emit("onClose", isOpen.value);
};

const closeButtonElement = ref(null);

const closeClickOutside = () => {
  if (props.outsideClose) {
    handleClose();
  }
};

const transitionChildDuration = ref(500);

const animationEnterFrom = computed(() => {
  switch (props.animation) {
    case "slide-to-right":
      return "-translate-x-full";
    case "slide-to-top":
      return "translate-y-full";
    case "slide-to-bottom":
      return "-translate-y-full";
    case "slide-to-left":
      return "translate-x-full";
    default:
      return "translate-x-full";
  }
});

const animationEnterTo = computed(() => {
  switch (props.animation) {
    case "slide-to-right":
      return "translate-x-0";
    case "slide-to-top":
      return "translate-y-0";
    case "slide-to-bottom":
      return "translate-y-0";
    case "slide-to-left":
      return "translate-x-0";
    default:
      return "translate-x-0";
  }
});

const animationLeaveFrom = computed(() => {
  switch (props.animation) {
    case "slide-to-right":
      return "translate-x-0";
    case "slide-to-top":
      return "translate-y-0";
    case "slide-to-bottom":
      return "translate-y-0";
    case "slide-to-left":
      return "translate-x-0";
    default:
      return "translate-x-0";
  }
});

const animationLeaveTo = computed(() => {
  switch (props.animation) {
    case "slide-to-right":
      return "-translate-x-full";
    case "slide-to-top":
      return "translate-y-full";
    case "slide-to-bottom":
      return "-translate-y-full";
    case "slide-to-left":
      return "translate-x-full";
    default:
      return "translate-x-full";
  }
});

watch(
  () => props.status,
  () => {
    isOpen.value = props.status;
  }
);
</script>

<template>
  <TransitionRoot
    :initial-focus="closeButtonElement"
    :show="isOpen"
    class="sidesheet"
    as="template"
    appear
  >
    <Dialog
      as="div"
      class="sidesheet_dialog relative z-[999]"
      @keyup.esc="handleClose"
    >
      <TransitionChild
        as="div"
        class="sidesheet__transition-child"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="sidesheet_layer fixed inset-0 bg-base-400 opacity-25"
          @click="closeClickOutside"
        />
      </TransitionChild>

      <TransitionChild
        :duration="transitionChildDuration"
        as="template"
        enter="transition-transform ease-out delay-200"
        :enter-from="animationEnterFrom"
        :enter-to="animationEnterTo"
        leave="transition-transform ease-out"
        :leave-from="animationLeaveFrom"
        :leave-to="animationLeaveTo"
      >
        <div
          class="sidesheet_position fixed top-0 bottom-0 w-full md:max-w-[480px]"
          :class="[
            { 'right-0': animation === 'slide-to-left' },
            { 'left-0': animation === 'slide-to-right' },
            { 'left-0 top-auto': animation === 'slide-to-top' },
          ]"
          :style="{ transitionDuration: `${transitionChildDuration}ms` }"
        >
          <div
            class="sidesheet_content bg-white"
            :class="[
              { 'h-full': !heightAuto },
              { 'h-auto': heightAuto as boolean },
            ]"
          >
            <DialogPanel
              class="sidesheet_panel flex flex-col w-full h-full overflow-hidden transition-all"
            >
              <DialogTitle as="div" class="w-full flex-none bg-grey-100">
                <div
                  class="sidesheet_header flex w-full items-center p-4"
                  :class="title ? 'justify-between' : 'justify-end'"
                >
                  <div v-if="title" class="sidesheet_title">
                    {{ title }}
                  </div>
                  <button
                    ref="closeButtonElement"
                    aria-label="close modal"
                    role="button"
                  >
                    <IconsNavigationClose
                      v-if="closeButton"
                      class="sidesheet_close cursor-pointer"
                      @click="handleClose"
                    />
                  </button>
                </div>
              </DialogTitle>
              <div class="sidesheet_body w-full flex-1 overflow-y-auto">
                body
                <slot name="body" />
              </div>
              <div class="sidesheet_footer">
                <slot name="footer" />
              </div>
            </DialogPanel>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
