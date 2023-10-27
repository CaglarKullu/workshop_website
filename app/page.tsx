import Carousel from "@/components/MyCarousel";


const slidesData = [
  { src: '/image1.png', link: '/page1' },
  { src: '/image2.png', link: '/page2' },
  { src: '/image3.png' }, 
  { src: '/image4.png' },  // This slide does not have a link
];
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
  <Carousel slides={slidesData} autoPlay={true} interval={5000}  />
    </main>
  )
}
