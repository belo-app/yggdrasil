import pMap from "p-map";
type Mapper<Element = any, NewElement = any> = (input: Element, index: number) => NewElement | Promise<NewElement> | PromiseLike<NewElement>;
export declare function concurrent<Element, NewElement>(input: Iterable<Element>, mapper: Mapper<Element, NewElement>, options?: pMap.Options): PromiseLike<NewElement[]>;
export {};
