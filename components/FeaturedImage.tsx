import Image from "next/image";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  featuredImage?: {
    node: {
      mediaDetails: {
        sizes: {
          sourceUrl: string;
          width: number;
          height: number;
        }[];
      };
    };
  };
}

interface ImageData {
  src: string;
  width: number | `${number}`;
  height: number | `${number}`;
}

interface Props {
  post: Post;
}

export default function FeaturedImage({ post }: Props) {
  let img: ImageData = {
    src: "",
    width: 0,
    height: 0,
  };

  const defaultFeaturedImage =
    "https://gatsby.vdisain.dev/wp-content/uploads/2024/03/placeholder-image.jpg";
  const defaultWidth = 300;
  const defaultHeight = 200;

  if (post.featuredImage) {
    let size = post.featuredImage.node.mediaDetails.sizes[0];

    img = {
      src: size.sourceUrl,
      width: size.width,
      height: size.height,
    };
  } else {
    img = {
      src: defaultFeaturedImage,
      width: defaultWidth,
      height: defaultHeight,
    };
  }

  return (
    <Link href={`blog/${post.slug}`}>
      <Image
        src={img.src}
        width={img.width}
        height={img.height}
        alt={post.title}
        className="h-full w-full object-cover rounded-xl"
      />
    </Link>
  );
}
