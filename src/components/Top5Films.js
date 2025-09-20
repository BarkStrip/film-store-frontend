import FilmDetailsButton from "./FilmDetailsButton"

export default function Top5Films({ data }) {

    return (
        <div className="item-grid">
            {data.length > 0 ? (
                data.map((film, index) => (
                    <div key={film.film_id} className="item-card">

                        <h3 className="item-title">{film.title}</h3>
                        <p1 className="ranking">{index + 1}</p1 >
                        <div>
                            <FilmDetailsButton film={film} />
                        </div>

                    </div>
                ))
            ) : (
                <p>Loading . . .</p>
            )}
        </div>


    )
};