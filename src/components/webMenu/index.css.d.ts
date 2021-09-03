declare namespace IndexCssNamespace {
  export interface IIndexCss {
    subMenu: string;
    title: string;
    webMenuContainer: string;
  }
}

declare const IndexCssModule: IndexCssNamespace.IIndexCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexCssNamespace.IIndexCss;
};

export = IndexCssModule;
