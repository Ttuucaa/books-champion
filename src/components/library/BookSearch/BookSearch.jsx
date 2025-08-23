import { Form } from 'react-bootstrap';


const BookSearch = ({ onSearch }) => {
    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        onSearch(searchTerm);
    }
    return (
        <Form.Group className="mb-3" controlId="searchBook" style={{ width: '50%', margin: 'auto' }}>
            <Form.Control
                type="text"
                placeholder="Buscar libro..."
                className="search-input"
                onChange={handleSearch}
            />
        </Form.Group>
    )
}

export default BookSearch;
