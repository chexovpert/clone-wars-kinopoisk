import React from "react"
import './actor.css'
class Actor extends React.Component {
    constructor(props) {
        super();
        this.id=props;
    }

    state= {
        actor: null,
        isLoaded: false,
        error: null,
    }
    componentDidMount() {
        fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff/37859`, 
        {
          method: 'GET',
          headers: {
            "accept": "application/json",
            "X-API-KEY": "d900330b-700e-447a-905a-d5b8497d1cc8"
          }
        })
          .then(res => res.json())
          .then(
            (result) => {
              //const actors = this.state.items.actor
              this.setState({
                isLoaded: true,
                actors: result
              });
              console.log(this.state);
            },
            // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
            // чтобы не перехватывать исключения из ошибок в самих компонентах.
            (error) => {
              console.log("error");
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

    render() {
      {
        const { error, isLoaded, actors } = this.state;
        if (error) {
          return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Загрузка...</div>;
        } else {
          return (
            <div className='actorwrap'>
              <div className ='firstcolumn'>
                <div className='actorPic'>
                </div>
              </div>
              <div className ='firstcolumn'>
                <img src={actors.posterUrl} alt='actorname'/>
                <div className="description">
                    <div className="actorName">
                        <h1>{actors.nameRu}</h1>
                        <h2>{actors.nameEn}</h2>
                    </div>
                    <div className="about">
                        <h2>About</h2>
                        <p>{actors.profession}</p>
                        <p>{actors.growth}</p>
                        <p>{actors.birthday}, {actors.age} лет</p>
                        <p>{actors.birthplace}</p>
                        <p>Jenre</p>
                        <p>Movies: {actors.films.length}</p>
                    </div>
                </div>
                </div>
            
        </div>
          );
        }
      }
    }
  


     }

export default Actor