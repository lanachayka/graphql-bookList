import {graphql} from "@apollo/client/react/hoc";
import {getBookQuery} from "../queries/queries";

function BookDetails(props) {
    if(props.data.book && props.data.loading === false) {
        return (
            <div id="book-details">
                <h2>{props.data.book.name}</h2>
                <p>{props.data.book.genre}</p>
                <p>{props.data.book.author.name}</p>
                <p>All books by this author:</p>
                <ul className="other-books">
                    {props.data.book.author.books.map(item=> {
                        return <li key={item.id}>{item.name}</li>
                    })}
                </ul>
            </div>
        )
    }
    return (<div id="book-details">No book selected</div>)
}

export default graphql(getBookQuery, {
     options: (props) => {
         return {
             variables: {
                id: props.bookId
             }
         }
     }
})(BookDetails);
