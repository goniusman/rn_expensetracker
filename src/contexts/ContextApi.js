import React, { createContext, useContext, useEffect, useState } from "react";


const ExpContext = createContext();

export const useExpense = () => useContext(ExpContext);
export const Consumer = ExpContext.Consumer
export const Provider = ExpContext.Provider

export default ExpContext
