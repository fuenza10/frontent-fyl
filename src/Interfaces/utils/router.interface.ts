/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NavigateOptions, Location, To } from "react-router-dom";
interface NavigateFunction {
    (to: To, options?: NavigateOptions): void;
    (delta: number): void;
}
export interface IRouterDom {
    location: Location,
    navigate: NavigateFunction,
    params: any,
}