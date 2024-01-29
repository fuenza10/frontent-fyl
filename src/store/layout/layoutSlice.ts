import {
  layoutModeTypes,
  layoutTypes,
  layoutWidthTypes,
  leftBarThemeImageTypes,
  leftSideBarThemeTypes,
  leftSidebarTypes,
  topBarThemeTypes,
} from "@/src/constants/layout";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Tipos para el estado
interface LayoutState {
  layoutType: string;
  layoutModeType: string;
  layoutWidth: string;
  leftSideBarTheme: string;
  leftSideBarThemeImage: string;
  leftSideBarType: string;
  topbarTheme: string;
  isPreloader: boolean;
  showRightSidebar: boolean;
  isMobile: boolean;
  showSidebar: boolean;
  leftMenu: boolean;
  rightSidebarVisible?: boolean;
  sidebarVisible?: boolean;
  leftMenuVisible?: boolean;
}

// Estado inicial
const initialState: LayoutState = {
  layoutType: layoutTypes.VERTICAL,
  layoutModeType: layoutModeTypes.LIGHT,
  layoutWidth: layoutWidthTypes.FLUID,
  leftSideBarTheme: leftSideBarThemeTypes.DARK,
  leftSideBarThemeImage: leftBarThemeImageTypes.NONE,
  leftSideBarType: leftSidebarTypes.DEFAULT,
  topbarTheme: topBarThemeTypes.LIGHT,
  isPreloader: false,
  showRightSidebar: false,
  isMobile: false,
  showSidebar: true,
  leftMenu: false,
};

// Funciones auxiliares
function changeBodyAttribute(attribute: string, value: string): void {
  if (document.body) document.body.setAttribute(attribute, value);
}

// function manageBodyClass(cssClass: string, action = "toggle") {
//   switch (action) {
//     case "add":
//       if (document.body) document.body.classList.add(cssClass);
//       break;
//     case "remove":
//       if (document.body) document.body.classList.remove(cssClass);
//       break;
//     default:
//       if (document.body) document.body.classList.toggle(cssClass);
//       break;
//   }
// }
// Async thunk para changeLayout
export const changeLayout = createAsyncThunk(
  "layout/changeLayout",
  async (layout: string, { dispatch }) => {
    if (layout === "horizontal") {
      dispatch(changeTopbarTheme("dark"));
      document.body.removeAttribute("data-sidebar");
      // Más lógica...
    } else {
      dispatch(changeTopbarTheme("light"));
      // Más lógica...
    }
    changeBodyAttribute("data-layout", layout);
  }
);

// Slice para layout
const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    changeLayout: (state, action: PayloadAction<string>) => {
      state.layoutType = action.payload;
    },
    changePreloader: (state, action: PayloadAction<boolean>) => {
      state.isPreloader = action.payload;
    },
    changeLayoutMode: (state, action: PayloadAction<string>) => {
      state.layoutModeType = action.payload;
    },
    changeLayoutWidth: (state, action: PayloadAction<string>) => {
      state.layoutWidth = action.payload;
    },
    changeSidebarTheme: (state, action: PayloadAction<string>) => {
      state.leftSideBarTheme = action.payload;
    },
    changeSidebarThemeImage: (state, action: PayloadAction<string>) => {
      state.leftSideBarThemeImage = action.payload;
    },
    changeSidebarType: (
      state,
      action: PayloadAction<{ sidebarType: string; isMobile?: boolean }>
    ) => {
      state.leftSideBarType = action.payload.sidebarType;
    },
    changeTopbarTheme: (state, action: PayloadAction<string>) => {
      state.topbarTheme = action.payload;
    },
    showRightSidebar: (state, action: PayloadAction<boolean>) => {
      state.rightSidebarVisible = action.payload;
    },
    showSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebarVisible = action.payload;
    },
    toggleLeftmenu: (state, action: PayloadAction<boolean>) => {
      state.leftMenuVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeLayout.fulfilled, (_state, _action) => {
      // Manejar estado después de cambiar el layout
    });
    // Manejar otros estados de las thunks...
  },
});

// Exporta las acciones y el reducer
export const {
  changeTopbarTheme,
  changeLayoutMode,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarThemeImage,
  changeSidebarType,
  showRightSidebar,
  showSidebar,
  changePreloader,

  toggleLeftmenu,
} = layoutSlice.actions;
export default layoutSlice.reducer;
