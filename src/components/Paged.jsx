export default function Paged({ roomsPerPage, allRooms, paged, currentPage }) {
    const pageNumbers = [];

    /**
     * Match.ceil devuelve el entero mayo o igual más próximo al número dado
     * https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
    */    
    for (let i = 1; i <= Math.ceil(allRooms/ roomsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return (
        <div className="paged">
            {
                pageNumbers &&
                pageNumbers.map(number => (
                    <button className={currentPage===number ? "active" : ""} key={number} onClick={() => paged(number)}>{number}</button>
                    
                ))
            }

        </div>
    );
    }

