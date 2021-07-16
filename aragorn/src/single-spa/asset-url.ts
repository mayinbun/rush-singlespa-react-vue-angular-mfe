// In single-spa, the assets need to be loaded from a dynamic location,
// instead of hard coded to `/assets`. We use webpack public path for this.
// See https://webpack.js.org/guides/public-path/#root

import { Pipe, PipeTransform } from '@angular/core';

export function assetUrl(url: string): string {
  // @ts-ignore
  const publicPath = __webpack_public_path__;
  const publicPathSuffix = publicPath.endsWith('/') ? '' : '/';
  const urlPrefix = url.startsWith('/') ? '' : '/';

  return `${publicPath}${publicPathSuffix}assets${urlPrefix}${url}`;
}

@Pipe({
  name: 'assetUrl'
})
export class AssetUrlPipe implements PipeTransform {
  public transform(value: any): any {
    return assetUrl(value);
  }
}
