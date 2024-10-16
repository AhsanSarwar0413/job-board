export default function Hero() {
    return (
        <section className="my-16 container">
            <h1 className="text-4xl font-bold text-center">Find your next <br />dream job</h1>
            {/* <p className="text-center text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis doloribus veritatis nam eos sint, et, nostrum ea dignissimos quidem tempore quisquam fugit. Delectus laboriosam tempora ipsum hic quasi voluptates fugit.
            </p> */}
            <form className="flex gap-2 mt-4 max-w-md mx-auto">
                <input
                    type="search"
                    className="border border-gray-400 w-full px-3 py-2 rounded-md"
                    placeholder="Search phrase..."
                />
                <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
                    Search
                </button>
            </form>
        </section>
    )
}
