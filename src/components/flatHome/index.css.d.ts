declare namespace IndexCssNamespace {
  export interface IIndexCss {
    detailContainer: string;
    flatContainer: string;
    thumbnailImg: string;
  }
}

declare const IndexCssModule: IndexCssNamespace.IIndexCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexCssNamespace.IIndexCss;
};

export = IndexCssModule;
