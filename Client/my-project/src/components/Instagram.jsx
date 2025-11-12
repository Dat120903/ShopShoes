import ImgItem from '../assets/imgItem.png';

export default function EvaShoes() {
  return (
    <section className="mt-20">
      <div className="max-w-[1410px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="font-normal text-2xl sm:text-3xl md:text-[35px] lowercase text-center mb-8">
          @evashoes
        </h2>

        <div className="w-full">
          <img src={ImgItem} alt="evashoes" className="w-full h-auto object-cover rounded-lg" />
        </div>
      </div>
    </section>
  );
}
