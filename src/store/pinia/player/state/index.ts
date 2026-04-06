import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
    // TODO: Это что за комменты как от нейронки?))
    // рекомендуется стрелочная функция для полного вывода типа
    state: () => {
        return {
            // для всех этих свойств тип будет определяться автоматически
            count: 0,
            name: 'Eduardo',
            isAdmin: true,
            items: [],
            hasChanged: true,
        }
    },
})