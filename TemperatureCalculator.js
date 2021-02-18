//Accepts temperature as a prop (parameter).
//Returns: Prints whether it's enough 
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

//Convert numbers
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

//Takes a string temperature and a converter function as arguments and returns a string.
//Calculate the value of one input based on the other input.
//Returns: An empty string on an invalid temperature and keeps the output
//rounded to the third decimal place.
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

//Component called Calculator
class Calculator extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.handleChange = this.handleChange.bind(this);
    //     this.state = {temperature: ''};
    // }

    // handleChange(e) {
    //     this.setState({temperature: e.target.value});
    // }

    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        //Whatever input you update, one gets preserved and the other is recalculated.
        this.state = {temperature: '', scale:'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    //Render two separate temperature inputs.
    //Now two inputs but when entering one, the other doesn't update.
    //We need to sync them.
    //Doesn't display the BoilingVerdict from Calculator.
    //Calculator doesn't know the current temperature because it's hidden inside the TemperatureInput.
    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ?
        tryConvert(temperature, toCelsius) :
        temperature;
        const fahrenheit = scale === 'c' ?
        tryConvert(temperature, toFahrenheit) :
        temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />

                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />

                <BoilingVerdict celsius={parseFloat(celsius)} />
            </div>
        )

        // return (
        //     <div>
        //         <TemperatureInput scale="c" />
        //         <TemperatureInput scale="f" />
        //     </div>
        // );
    }

    //Renders an <input> that lets you enter the temperature
    //Keeps the values in this.state.temperature
    // render() {
    //     const temperature = this.state.temperature;
    //     //Renders the BoilingVerdict for the current input value.
    //     return (
    //         <fieldset>
    //             <legend>Enter temperature in Celsius:</legend>
    //             <input value={temperature} onChange={this.handleChange} />
               
    //             <BoilingVerdict celsius={parseFloat(temperature)} />
    //         </fieldset>
    //     );        
    // }
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

//Extracting TemperatureInput component from Calculator.
//Currently both TemperatureInput components independently keeps their values in the local state.
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        //this.state = {temperature: ''};
    }

    handleChange(e) {
        // Before: this.setState({temperature: e.target.value});

        //This prop will be provided together with the temperature prop by parent Calculator component.
        //It will handle the change by modifying its own local state, thus re-rendering both input with new values.
        this.props.onTemperatureChange(e.target.value);
    }

    //Added new scale prop that can either be "c" or "f"
    render() {
        // Before: const temperature = this.state.temperature;
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        );
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
  );
