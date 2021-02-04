import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
const statelatlong =[
  {State: 'Colorado',	Lat: 39.5500507, Long:	-105.7820674},
  {State: 'Illinois',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Montana',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'New Hampshire',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'New York',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Arkansas',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Kentucky',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'California',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Maine',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Oregon',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Rhode Island',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Virgin Islands',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Minnesota',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Vermont',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'West Virginia',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Mississippi',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Nebraska',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Wisconsin',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'New Jersey',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Wyoming',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'New Mexico',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Guam',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Alaska',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Iowa',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Kansas',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Pennsylvania',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'South Dakota',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Maryland',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Tennessee',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Washington',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Northern Mariana Islands',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Puerto Rico',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Missouri',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Connecticut',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Nevada',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Indiana',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Oklahoma',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Massachusetts',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'North Carolina',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Delaware',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'District of Columbia',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'North Dakota',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Ohio',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Alabama',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Arizona',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Idaho',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Louisiana',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Michigan',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Texas',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Virginia',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Florida',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Georgia',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Hawaii',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'South Carolina',	Lat: 40.6331249, Long:	-89.3985283},
  {State: 'Utah',	Lat: 40.6331249, Long:	-89.3985283}


];
const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [state, setInputState] = useState("state");
 //const [latlng, setStateLatlng] = useState("latlng")
  const [county, setInputCounty] = useState("county")
  const [countryInfo, setCountryInfo] = useState({});
  const [stateInfo, setStateInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapStates, setMapStates] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [counties, setCounties] = useState([]);
  const [countiesInfo, setCountiesInfo] = useState([]);
  const [latlng, setStateLatlng] = useState([]);
  const[casesdata,setcasesdata] = useState([]);
  
 
  
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setStateInfo(data);
      });
  }, []);

  

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  useEffect(() => {
    const getStatesData = async () => {
      fetch("https://disease.sh/v3/covid-19/states")
        .then((response) => response.json())
        .then((data) => {
          const states = data.map((state) => ({
            name: state.state,
           value: state.state,
          }));
          let sortedData = sortData(data);
          setStates(states);
          setMapStates(data);
          setTableData(sortedData);
        });
    };

    getStatesData();
  }, []);

  useEffect(() => {
      const getCountiesData = async () => {
      fetch("https://disease.sh/v3/covid-19/jhucsse/counties")
        .then((response) => response.json())
        .then((data) => {  
          console.log(data);
          setCountiesInfo(data);
        });
    };

    getCountiesData();
  }, []);

  console.log(casesType);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        if(countryCode != "worldwide"){
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);   
        }
      else{
          setMapCenter([ 34.80746, -40.4796]);
      }
        
      });
  };

  const onCountyChange = (e, countiesInfo) =>{
    
    const county = e.target.value;
    const selctedCounty = countiesInfo.find(i=>i.county===county);
    let countystats =[];
    setInputCounty(county);
  
   countystats.push({
    todayCases: selctedCounty.stats.confirmed,
    todayRecovered: selctedCounty.stats.recovered,
    todayDeaths: selctedCounty.stats.deaths
   })
   setCountryInfo(countystats[0]);
  }

  const onStateChange = async (e, countiesInfo) => {
    const stateCode = e.target.value;
    const url =
      stateCode === "state"
        ? "https://disease.sh/v3/covid-19/countries/US"
        : `https://disease.sh/v3/covid-19/states/${stateCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let countiesList=[];
      countiesInfo.map((county) => {
      if(county.province===stateCode){
    countiesList.push({
          name: county.county,
         value: county.county        
        })
        setCounties(countiesList)
      }
      else{
        setInputCounty("county");

      }
      });
       
        setStates(states);
        setInputState(stateCode);
        setCountryInfo(data);
       setMapCenter([ 39.5500507, 	-89.3985283]);
        setMapZoom(5);
       // this.setState({value: event.target.value});
      });
  };

  

  return (
    
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>    
               
             {
               country==='US' ? (<span><FormControl className="app__dropdown">
               <Select
                 variant="outlined"
                 value={state}
                 onChange={(e) => onStateChange(e, countiesInfo)}
               >
                 <MenuItem value="state">State</MenuItem>
                 {states.map((state) => (
                   <MenuItem value={state.value}>{state.name}</MenuItem>
                 ))}
               </Select>
             </FormControl>
             </span>):(null)
             }
             {
             state!=='state' ?(<span><FormControl className="app__dropdown">
             <Select
               variant="outlined"
               value={county}
               onChange={(e) => onCountyChange(e, countiesInfo)}
             >
               <MenuItem value="county">County</MenuItem>
               
               {counties.map((county) => (
                 <MenuItem value={county.value}>{county.name}</MenuItem>
               ))}
             </Select>
           </FormControl>
           </span>
             ):(null)
             
             }
         
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
           
              total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
           <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="TestRate"
            isBlue
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.testsPerOneMillion)}
            total={numeral(countryInfo.tests).format("0.0a")}
          />
        </div>
        <div>
        {
               state ==='state' ? (
                <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />):( <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />)
        }
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
