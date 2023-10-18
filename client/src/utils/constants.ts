import { ToastOptions } from "react-toastify";


export const NUMBER_OF_ESSENTIAL_DATA = 5;
export const NUMBER_OF_ENTRIES = 10;

export const DEFAULT_PARAMS: DataProps  = {
  type: "grocery list",
  label: "product",
  shortenedLabel: "prd",
  essentialData1: "name",
  essentialData2: "manufacturer",
  essentialData3: "description",
  essentialData4: "unit price",
  essentialData5: "quantity",
  fullname: "adrian sajulga"
}

export const EMPTY_PARAMS: DataProps = {
  type: "",
  label: "",
  shortenedLabel: "",
  essentialData1: "",
  essentialData2: "",
  essentialData3: "",
  essentialData4: "",
  essentialData5: "",
  fullname: ""
}
export const defaultToastConfig: ToastOptions<{}> = {
	position: "top-center",
	autoClose: 3000,
	theme: "dark",
};


