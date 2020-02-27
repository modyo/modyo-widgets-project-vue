<template>
  <div id="app">
   <m-datepicker
          v-model="date"
          :format="dateFormats.short"
          :max-date="maxDate"
          :locale="locale"
          :range-presets="rangePresets"
          color="#2e4553"
          name="Seleccione Periodo"
          fullscreen-mobile
          validate
          range
          no-input
          class="datepicker"
          label="fecha"
          >
<template #activator="{ date }">
            <button
              ref="activator"
              class="filters-date__btn-mobile btn btn-link d-lg-none p-2"
              type="button">
              <div
                icon="calendar" />
            </button>
            <button
              ref="activator"
              class="filters-date__btn btn d-none d-lg-inline-block p-2"
              type="button">
              <div
                icon="calendar"
                class="mr-2" />
              {{ date }}
            </button>
          </template>
          </m-datepicker>
  </div>
</template>
<script>
import { MDatepicker } from './components/atoms';

export default {
  name: 'mainApp',
  components: { MDatepicker },
  data: () => ({
    date: new Date(),
    maxDate: new Date(),
    dateFormats: 'DD-MM-YYYY',
    rangePresets: [
      {
        name: 'Més Actual',
        dates: {
          start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        },
      },
      {
        name: 'Més Pasado',
        dates: {
          start: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
          end: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
        },
      },
      {
        name: 'Trimestre',
        dates: {
          start: new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1),
          end: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
        },
      },
      {
        name: 'Semestre',
        dates: {
          start: new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1),
          end: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
        },
      },
    ],
    locale: {
      lang: 'fr', // or 'en', 'es', 'de',
      weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'], // you can surcharge weekDays too
    },
  }),
};
</script>
<style lang="scss">
.filters-date__btn.btn {
    font-size: 14px;
    color: red;
    background-color: #fff;
    border-color: yellowgreen;
    &:hover{
      border-color: red;
    }
}
</style>
