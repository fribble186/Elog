declare namespace IndexCssNamespace {
  export interface IIndexCss {
    detail: string;
    goBack: string;
    listContainer: string;
    listItem: string;
    title: string;
  }
}

declare const IndexCssModule: IndexCssNamespace.IIndexCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexCssNamespace.IIndexCss;
};

export = IndexCssModule;
