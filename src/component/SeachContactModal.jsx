import { useState } from 'react'
import { useUserStore } from '../store/useUserStore'
const SearchModal = ({onClose}) => {
  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState(null)

  const { addToContact, getUserByEmail } = useUserStore();

  const handleSearch = async () => {
    const user_contact = await getUserByEmail(searchText);
    const result=addToContact(user_contact._id);
    setSearchResult(result);
  }

  return (
    <div className="fixed inset-0 z-[999] backdrop-blur-sm flex items-center justify-center p-4">
      <div className=" rounded-xl shadow-3d w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold   font-sans">
            Add to contact
          </h2>
          <button
            onClick={onClose}
            className="text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type email"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-4 py-2 border  rounded-lg 
                        focus:ring-2 focus:ring-primary-500 focus:border-transparent
                          font-sans"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600  
                        rounded-lg transition-colors duration-200 font-semibold
                        focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Add
            </button>
          </div>

          {searchResult !== null && (
            <div className="mt-4 text-center">
              <p className={`text-lg font-semibold 
                ${searchResult ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'}`}>
                {searchResult ? 'Success' : 'User Not Found!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal