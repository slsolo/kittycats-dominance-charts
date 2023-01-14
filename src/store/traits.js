import { defineStore } from "pinia";
import axios from "axios";

export const useTraitsStore = defineStore("traits", {
  state: () => ({ traits: {} }),
  getters: {
    getTraits(state) {
      return state.traits;
    },
  },
  actions: {
    async fetchTraits() {
      try {
        const data = await axios.get(
          ""
        );
        let shts = {};
        data.data.sheets.forEach((sht) => {
          let sheetProcessed = false;
          shts[sht.properties.title] = [];
          sht.data.forEach((row) => {
            if(sheetProcessed) return;
            let vals = {};
            row.rowData.forEach((cell, index) => {
              if(sheetProcessed) return;
              cell.values.forEach((val) => {
                if (sheetProcessed) return;
                if (!val.hasOwnProperty("formattedValue")) {
                  sheetProcessed = true;
                  return;
                }
                console.log(val);
                let key = val.formattedValue;
                let trait = {
                  name: "",
                  pos: 0,
                  isInitialRelease: false,
                  isRetired: false,
                };
                if (key.includes("*")) {
                  trait.isInitialRelease = true;
                  key.replace("*", "");
                }
                trait.name = key;
                vals[key] = trait;
              });
            });
            shts[sht.properties.title] = vals;
          });
        });
        this.traits = shts;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
