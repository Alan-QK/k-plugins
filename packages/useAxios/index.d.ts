// Type definitions for ./packages/useAxios/index.js
// Project: [LIBRARY_URL_HERE]
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface Props {
  url?: string;
  method?: string = 'get';
  options?: any = {};
  trigger?: any;
  // @deprecated
  filter?: any;
  forceDispatchEffect?: any;
  customHandler?: any;
}

export default (props: Props) => {};
