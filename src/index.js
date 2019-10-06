import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

const App = props => 
{
	const colors = ['#342224', '#16a085', '#27ae60', '#2c3e50', '#f39c12', 
		'#e74c3c', '#9b59b6', '#FB6964', "#472E32", 
		'#BDBB99', '#77B1A9', '#73A857'];
	const [quote, setQuote] = React.useState({quote: "Quote loading. . ."});
	const [quotes, setQuotes] = React.useState([]);
	const [color, setColor] = React.useState(colors[Math.floor(Math.random() * 12)]);
	React.useEffect(() => 
	{
		fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62" + 
		"d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
		.then(data => data.json()).then(json => 
		{
			setQuotes(json.quotes);
			setQuote(json.quotes[Math.floor(Math.random() * 101)]);
		}).catch(err => console.log(err));
	}, []);
	return (
		<div id="container" style={{backgroundColor: color}}>
			<div id="quote-box" style={{backgroundColor: "#fefefe", color: color}}>
				<div id="text">
					<span id="double-begin" className="fa fa-quote-left"></span>
					<span id="body">{quote.quote}</span>
				</div>

				<div id="author">
				- {quote.author}
				</div>
				<div id="bottom">
					<div id="socials">
						<a style={{backgroundColor: color, color: "#fefefe"}} id="tweet-quote" 
						title="Tweet this quote!" rel="noopener noreferrer" href=
						{`https://twitter.com/intent/tweet?hashtags=TheQuotesApp&related=JayCodist&text=${
							encodeURIComponent('"' + quote.quote + "\" - " + quote.author)}`} target="_blank">
							<i className="fab fa-twitter"></i></a>
					</div>
					<button style={{backgroundColor: color, color: "#fefefe"}} id="new-quote" onClick={() => 
					{
						document.getElementById("body").classList.add("animate-vanish");
						document.getElementById("double-begin").classList.add("animate-vanish");
						document.getElementById("author").classList.add("animate-vanish");
						setTimeout(() =>
						{
							setQuote(quotes.filter(a => a !== quote)[Math.floor(Math.random() * 100)]);
							setColor(colors.filter(a => a !== color)[Math.floor(Math.random() * 11)]);
							document.getElementById("body").classList.remove("animate-vanish");
							document.getElementById("double-begin").classList.remove("animate-vanish");
							document.getElementById("author").classList.remove("animate-vanish");
						}, 1000)
					}}>New Quote</button>
				</div>
			</div>
		</div>
		);
}

ReactDOM.render(<App />, document.getElementById("root"));