import React from 'react';

const Profile: React.FC = () => {
  return (
<div className="container my-8">
  <main className="w-full min-h-screen py-1">
    <div className="p-2 md:p-4">
      <div className="w-full  sm:rounded-lg">
        <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
        <div className="grid max-w-2xl mx-auto mt-8">
          <div className="flex flex-col sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-4">
            <img
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-green-300 dark:ring-green-500"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt="Bordered avatar"
            />
            <div className="flex flex-col space-y-5 ml-4">
              <button
                type="button"
                className="py-3.5 px-7 text-base font-medium text-green-100 focus:outline-none bg-[#80BD0A] rounded-lg border border-green-200 hover:bg-green-900 focus:z-10 focus:ring-4 focus:ring-green-200"
              >
                Change picture
              </button>
              <button
                type="button"
                className="py-3.5 px-7 text-base font-medium text-green-900 focus:outline-none bg-white rounded-lg border border-green-200 hover:bg-green-100 hover:text-[#80BD0A] focus:z-10 focus:ring-4 focus:ring-green-200"
              >
                Delete picture
              </button>
            </div>
          </div>
          <div className="items-center mt-8 sm:mt-14 text-[#80BD0A]">
            <div className="flex flex-col w-full space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-green-900 dark:text-white"
                >
                  Your first name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                  placeholder="Your first name"
                  defaultValue="Jane"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-green-900 dark:text-white"
                >
                  Your last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                  placeholder="Your last name"
                  defaultValue="Ferguson"
                  required
                />
              </div>
            </div>
            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-green-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                placeholder="your.email@mail.com"
                required
              />
            </div>
            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="profession"
                className="block mb-2 text-sm font-medium text-green-900 dark:text-white"
              >
                Profession
              </label>
              <input
                type="text"
                id="profession"
                className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                placeholder="your profession"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-green-900 dark:text-white"
              >
                Bio
              </label>
              <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-sm text-green-900 bg-green-50 rounded-lg border border-green-300 focus:ring-green-500 focus:border-green-500 "
                placeholder="Write your bio here..."
                defaultValue={""}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-green-700  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

);
}
export default Profile;
