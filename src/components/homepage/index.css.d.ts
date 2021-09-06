declare namespace IndexCssNamespace {
  export interface IIndexCss {
    description: string;
    homeContainer: string;
    subtitle: string;
    title: string;
  }
}

declare const IndexCssModule: IndexCssNamespace.IIndexCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexCssNamespace.IIndexCss;
};

export = IndexCssModule;
