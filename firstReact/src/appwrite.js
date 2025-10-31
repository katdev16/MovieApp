import { Query, Client, Databases, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID; // Changed from TABLE_ID

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
.setProject(PROJECT_ID)


const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    // 1 use Appwrite SDK to check if the search term exists in the database
    console.log('Received search parameters:', { searchTerm, movie });
    
    // Validate inputs
    if (!searchTerm || typeof searchTerm !== 'string') {
        console.error('Invalid searchTerm:', searchTerm);
        throw new Error('Search term is required and must be a string');
    }
    if (!movie || !movie.id) {
        console.error('Invalid movie object:', movie);
        throw new Error('Invalid movie object - missing required fields');
    }

    try {
        const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)
        ]);

        //2 if it exists, increment the count
        if(results.documents.length > 0){
            const doc = results.documents[0];
            
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            });
        //3 if it does not exist, create a new record with count 1
        } else {
            const documentData = {
                searchTerm: searchTerm.trim(),
                count: 1,
                movie_id: movie.id, // Ensure movie_ID is a string
                poster_url: movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : '',
            };
            
            console.log('Attempting to create document with data:', documentData);
            console.log('Using Database ID:', DATABASE_ID);
            console.log('Using Collection ID:', COLLECTION_ID);
            
            try {
                const response = await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), documentData);
                console.log('Document created successfully:', response);
            } catch (createError) {
                console.error('Detailed create error:', {
                    message: createError.message,
                    code: createError.code,
                    type: createError.type,
                    response: createError.response,
                    data: documentData
                });
                throw createError;
            }

        }
    }catch (error) {
        console.error('Error updating search count: ', error)
    }


}