import ActorDetailsButton from "./ActorDetailsButton"

export default function Top5Actors({ data }) {

    return (
        <div className="item-grid">
            {data.length > 0 ? (
                data.map((actor, index) => (
                    <div key={actor.actor_id} className="item-card">

                        <h3 className="item-title">{actor.first_name} {actor.last_name}</h3>
                        <p1 className="ranking">{index + 1}</p1 >
                        <div>
                            <ActorDetailsButton actor={actor} />
                        </div>

                    </div>
                ))
            ) : (
                <p>Loading . . .</p>
            )}
        </div>


    )
};