import Lightbox from "yet-another-react-lightbox";
import * as React from "react";

// Import plugins yet-another-react-lightbox
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
export const useLightbox = (slides) => {
  const [open, setOpen] = React.useState(false);

  const LightboxComponent = React.useCallback(
    () => (
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Fullscreen, Thumbnails, Zoom, Captions]}
        animation={{ fade: true }}
        carousel={{ preload: 2 }}
        thumbnails={{ width: 120 }}
        zoom={{ maxZoomPixelRatio: 3 }}
        captions={{ showCaption: true }}
      />
    ),
    [open, slides]
  );

  return { open, setOpen, LightboxComponent };
};

// covert from file to  Base64
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Khi quá trình đọc file hoàn tất
    reader.onload = () => {
      resolve(reader.result); // Kết quả là chuỗi Base64
    };

    // Khi xảy ra lỗi
    reader.onerror = (error) => {
      reject(error);
    };

    // Đọc file dưới dạng Base64
    reader.readAsDataURL(file);
  });
}
