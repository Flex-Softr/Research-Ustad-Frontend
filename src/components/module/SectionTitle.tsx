
type SectionTitle = {
 title : string;
 discription?:string;
}
const SectionTitle = ({title,discription}:SectionTitle) => {
  return (
    <div>
       <div>
      <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          {title}
        </h1>
        <p className="max-w-2xl mx-auto my-4 text-center text-gray-500 dark:text-gray-300">
       {discription && discription}
        </p>
      </div>
    </div>
  )
}

export default SectionTitle
