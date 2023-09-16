export function parseContentfulContentLogo(asset) {
  
    if (!asset) {
      return null;
    }
  
    if (!("fields" in asset)) {
      return null;
    }
  
    return {
      src: `https:${asset.fields.logo.fields.file?.url}` || "",
      alt: asset.fields.logo.fields.description || "",
      width: asset.fields.logo.fields.file?.details.image?.width || 0,
      height: asset.fields.logo.fields.file?.details.image?.height || 0,
    };
  }