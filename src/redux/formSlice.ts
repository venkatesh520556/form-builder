import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormSchema, FormField } from "../types/formTypes";
import { v4 as uuid } from "uuid";

interface FormState {
  currentForm: FormSchema;
  savedForms: FormSchema[];
}

const loadFormsFromStorage = (): FormSchema[] =>
  JSON.parse(localStorage.getItem("forms") || "[]");

const saveFormsToStorage = (forms: FormSchema[]) =>
  localStorage.setItem("forms", JSON.stringify(forms));

const initialState: FormState = {
  currentForm: { id: uuid(), name: "", createdAt: new Date().toISOString(), fields: [] },
  savedForms: loadFormsFromStorage(),
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormName(state, action: PayloadAction<string>) {
      state.currentForm.name = action.payload;
    },
    addField(state, action: PayloadAction<FormField>) {
      state.currentForm.fields.push(action.payload);
    },
    updateField(state, action: PayloadAction<FormField>) {
      const idx = state.currentForm.fields.findIndex(f => f.id === action.payload.id);
      if (idx >= 0) state.currentForm.fields[idx] = action.payload;
    },
    removeField(state, action: PayloadAction<string>) {
      state.currentForm.fields = state.currentForm.fields.filter(f => f.id !== action.payload);
    },
    reorderFields(state, action: PayloadAction<FormField[]>) {
      state.currentForm.fields = action.payload;
    },
    saveForm(state) {
      const newForm = { ...state.currentForm, id: uuid(), createdAt: new Date().toISOString() };
      state.savedForms.push(newForm);
      saveFormsToStorage(state.savedForms);
    },
    loadFormToCurrent(state, action: PayloadAction<FormSchema>) {
      state.currentForm = action.payload;
    }
  }
});

export const { setFormName, addField, updateField, removeField, reorderFields, saveForm, loadFormToCurrent } =
  formSlice.actions;

export default formSlice.reducer;
