import React from 'react';


class Pokemons extends React.Component {
    constructor(props) {
        super(props);
        // Store all pokemon data
        this.state = {
            displayType: "table",
            pokemonData: {
                attributes: [
                    "Name",
                    "Tags",
                ],
                pokemonCount: 4,
                tags: ["No Tags", "Mean", "red", "Cute"],
                pokemons: {
                    pokemon1: {
                        Name: "Charizard 1",
                        Tags: "Mean, red",
                    },
                    pokemon2: {
                        Name: "Pikachu 1",
                        Tags: "Cute",
                    },
                    pokemon3: {
                        Name: "Charizard 2",
                        Tags: "",
                    },
                    pokemon4: {
                        Name: "Pikachu 2",
                        Tags: "",
                    },
                },
            },
        };
        // Bind functions
        this.updateDisplay = this.updateDisplay.bind(this);
        this.updateData = this.updateData.bind(this);
        this.addPokemon = this.addPokemon.bind(this);
        this.addAttribute = this.addAttribute.bind(this);
        this.addTag = this.addTag.bind(this);
    }

    // Change from board to table
    updateDisplay(event) {
        this.setState({displayType: event.target.value});
    }

    // Update data in state based on edits made in the table
    updateData(event) {
        const target = event.target;
        this.setState(prevState => {
            // Save old state
            let pokemonData = {...prevState.pokemonData};
            // Update pokemon attribute
            pokemonData.pokemons[target.id][target.alt] = target.value;
            return {...prevState, pokemonData};
        });
    }

    // Add a new pokemon to the state
    addPokemon() {
        this.setState(prevState => {
            // Load old state info
            let pokemonData = {...prevState.pokemonData};
            let pokemonCount = prevState.pokemonCount;
            // Create new Pokemon
            let newPokemon = {};
            pokemonData.attributes.forEach((item) => {
                newPokemon[item] = "";
            });
            pokemonData.pokemons["pokemon" + pokemonCount] = newPokemon;
            pokemonCount++;
            // Update state
            return {...prevState, pokemonCount, pokemonData};
        });
    }

    // Add an attribute to each pokemon
    addAttribute() {
        this.setState(prevState => {
            // Load old state info
            let pokemonData = {...prevState.pokemonData};
            // Create new Attribute
            let newAttribute = document.getElementById("newAttributeBox").value;
            pokemonData.attributes.push(newAttribute);
            // Add attribute to each existing pokemon
            Object.values(pokemonData.pokemons).forEach((pok) => {
                pok[newAttribute] = "";
            })
            return {...prevState, pokemonData};
        });
    }

    // Add a new tag
    addTag() {
        this.setState(prevState => {
            // Load old state info
            let pokemonData = {...prevState.pokemonData};
            // Create new Pokemon
            let newTag = document.getElementById("newTagBox").value;
            pokemonData.tags.push(newTag);
            // Update state
            return {...prevState, pokemonData};
        });
    }

    render() {
        return (
            <div style={{textAlign: "left"}}>
                <select name="Display type" id="display-type" defaultValue={this.state.displayType} onChange={this.updateDisplay} style={{marginBottom: "10px"}}>
                    <option value="table">Table View</option>
                    <option value="board">Board View</option>
                </select>
                <button type="button" onClick={this.addPokemon}>Add Pokemon</button>
                <input type="text" placeholder="Enter Attribute" id="newAttributeBox"/>
                <button type="button" onClick={this.addAttribute}>Add Attribute</button>
                <input type="text" placeholder="Enter Tag" id="newTagBox"/>
                <button type="button" onClick={this.addTag}>Add Tag</button>
                <p>Available Tags: {this.state.pokemonData.tags.slice(1).toString()}</p>
                <PokemonDisplay displayType={this.state.displayType} pokemonData={this.state.pokemonData} updateData={this.updateData}/>
            </div>
        );
    }
}

class PokemonTable extends Pokemons {
    constructor(props) {
        super(props);
        this.pokemonData = props.pokemonData;
    }

    render() {
        // Give each attribute a th in the table
        const attributes = this.pokemonData.attributes.map((attr) =>
            <th style={{padding: "5px 20px 5px 20px"}} key={attr}>{attr}</th>
        );
        // Add each pokemon and all of their information into the table
        const pokemons = Object.entries(this.pokemonData.pokemons).map((pok, index) =>
            <tr key={index}>
                {this.pokemonData.attributes.map((attr) =>
                    <td key={attr}><input type="text" id={pok[0]} alt={attr} value={pok[1][attr].toString()} onChange={this.props.updateData} /></td>
                )}
            </tr>
        );

        return (
            <table border="1px solid black" style={{borderCollapse: "collapse"}}>
                <thead>
                    <tr>
                        {attributes}
                    </tr>
                </thead>
                <tbody>
                    {pokemons}
                </tbody>
            </table>
        );
    }
}

class PokemonBoard extends Pokemons {
    constructor(props) {
        super(props);
        this.pokemonData = props.pokemonData;
    }

    render() {
        // Give each tag a th in the table
        const tags = this.pokemonData.tags.map((tag, index) =>
            <th style={{padding: "5px 20px 5px 20px"}} key={index}>{tag}</th> 
        );
        // Add each pokemon to their corresponding tag(s)
        const pokemons = Object.entries(this.pokemonData.pokemons).map((pok, index) =>
            <tr key={index}>
                {this.pokemonData.tags.map((tag, index) => 
                    <td key={index}>{((tag === "No Tags" && !pok[1].Tags) || pok[1].Tags.includes(tag)) && pok[1].Name}</td>
                )}
            </tr>
        );

        return (
            <table border = "1px solid black" style={{borderCollapse: "collapse", emptyCells: "hide"}}>
                <thead>
                    <tr>
                        {tags}
                    </tr>
                </thead>
                <tbody>
                    {pokemons}
                </tbody>
            </table>
        );
    }
}

const PokemonDisplay = (props) => {
    if (props.displayType === "table") {
        return <PokemonTable pokemonData={props.pokemonData} updateData={props.updateData}/>;
    }
    return <PokemonBoard pokemonData={props.pokemonData} updateData={props.updateData}/>;
}


export default Pokemons;
