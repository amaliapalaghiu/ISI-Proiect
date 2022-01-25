function isNaturalNumber(n) {
    n = n.toString();

    const n1 = Math.abs(n);
    const n2 = parseInt(n, 10);

    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}

require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Locate",
    "esri/widgets/Track",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    "esri/rest/route",
    "esri/rest/support/RouteParameters",
    "esri/rest/support/FeatureSet",
    "esri/geometry/Point",
    "esri/rest/locator"
], function (
    esriConfig,
    Map,
    MapView,
    Locate,
    Track,
    Graphic,
    GraphicsLayer,
    FeatureLayer,
    route,
    RouteParameters,
    FeatureSet,
    Point,
    locator
) {
    esriConfig.apiKey =
        "AAPKd09d7c477e90443abb6473a4741c7b22HbOy9wrPyaF_Ad13oGaPsqUN-cz5J4EVYvrASvJz7PfDZb5q-3vlSw5Xv6Coczx1";

    const map = new Map({
        basemap: "arcgis-navigation"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [25.5887, 45.6427], //Longitude, latitude
        zoom: 6
    });

    const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

    const origin1 = new Point([23.6236, 46.7712]);   // Cluj
    const destination1 = new Point([26.1025, 44.4268])   // Bucuresti

    const origin2 = new Point([27.6014, 47.1585]);    // Iasi
    const destination2 = new Point([22.8576, 47.8017]); // Satu Mare

    view.popup.actions = [];


    view.when(async () => {
        // Extract query parameter
        const urlParams = new URLSearchParams(location.search);

        for (const [key, value] of urlParams) {
            console.log(`${key}: ${value}`);
        }

        const geocodingServiceUrl = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";


        const redColor = [175, 0, 0];
        const greenColor = [0, 175, 0];

        if (urlParams.has("userid") && urlParams.has("user_type") && isNaturalNumber(urlParams.get("userid")) && isNaturalNumber(urlParams.get("user_type"))) {
            if (urlParams.get("user_type") === "1") {   // Transportator
                // Camioanele sale verzi (oferte, luate din tabelul curse)
                // http://localhost:3000/api/transportatori/offers/:id
                const trucks = await fetch(`http://localhost:3000/api/transportatori/offers/${urlParams.get("userid")}`)
                    .then(data => {
                        return data.json();
                    })

                console.log(trucks);

                for (let i = 0; i < trucks.length; ++i) {
                    const geocodeParams = {
                        address: {
                            "address": trucks[i].locul_plecarii
                        }
                    }

                    truckPoint = await locator.addressToLocations(geocodingServiceUrl, geocodeParams).then(result => {
                        return result[0].location;
                    });

                    const dataPlecarii = new Date(trucks[i].data_plecarii);
                    const dataSosirii = new Date(trucks[i].data_sosirii);
                    const dataAcum = new Date(Date.now());

                    if (dataSosirii < dataAcum) {
                        continue;
                    }

                    let truckColor = greenColor;
                    if (dataPlecarii <= dataAcum && dataAcum <= dataSosirii) {
                        truckColor = redColor;
                    }

                    let truckPath;
                    if (truckColor === redColor) {
                        const startGeocodeParams = {
                            address: {
                                "address": trucks[i].locul_plecarii
                            }
                        }

                        const stopGeocodeParams = {
                            address: {
                                "address": trucks[i].locul_sosirii
                            }
                        }

                        const startPoint = await locator.addressToLocations(geocodingServiceUrl, startGeocodeParams).then(result => {
                            return result[0].location;
                        })

                        const stopPoint = await locator.addressToLocations(geocodingServiceUrl, stopGeocodeParams).then(result => {
                            return result[0].location;
                        })

                        const startGraphic = addGraphic("origin", startPoint);
                        const stopGraphic = addGraphic("destination", stopPoint);

                        truckPath = await getRoute([startGraphic, stopGraphic], [255, 0, 0], true);
                        console.log(truckPath);
                    }


                    const truckGraphic = addTruck(truckPoint, trucks[i], truckColor);

                    if (truckColor === redColor) {
                        view.graphics.remove(truckGraphic);

                        truckPoint = new Point([truckPath[800], truckPath[801]]);
                        addTruck(truckPoint, trucks[i], truckColor);
                    }
                }
            } else if (urlParams.get("user_type") === "2") {    // Expeditor
                // Camioanele sale verzi (oferte, luate din tabelul curse)
                // http://localhost:3000/api/transportatori/offers/:id
                const trucks = await fetch(`http://localhost:3000/api/transportatori/offers/21`)
                    .then(data => {
                        return data.json();
                    })

                console.log(trucks);

                for (let i = 0; i < trucks.length; ++i) {
                    const geocodeParams = {
                        address: {
                            "address": trucks[i].locul_plecarii
                        }
                    }

                    truckPoint = await locator.addressToLocations(geocodingServiceUrl, geocodeParams).then(result => {
                        return result[0].location;
                    });

                    const dataPlecarii = new Date(trucks[i].data_plecarii);
                    const dataSosirii = new Date(trucks[i].data_sosirii);
                    const dataAcum = new Date(Date.now());

                    if (dataSosirii < dataAcum) {
                        continue;
                    }

                    let truckColor = greenColor;
                    if (dataPlecarii <= dataAcum && dataAcum <= dataSosirii) {
                        truckColor = redColor;
                    }

                    let truckPath;
                    if (truckColor === redColor) {
                        const startGeocodeParams = {
                            address: {
                                "address": trucks[i].locul_plecarii
                            }
                        }

                        const stopGeocodeParams = {
                            address: {
                                "address": trucks[i].locul_sosirii
                            }
                        }

                        const startPoint = await locator.addressToLocations(geocodingServiceUrl, startGeocodeParams).then(result => {
                            return result[0].location;
                        })

                        const stopPoint = await locator.addressToLocations(geocodingServiceUrl, stopGeocodeParams).then(result => {
                            return result[0].location;
                        })

                        const startGraphic = addGraphic("origin", startPoint);
                        const stopGraphic = addGraphic("destination", stopPoint);

                        truckPath = await getRoute([startGraphic, stopGraphic], [255, 0, 0], false);
                        console.log(truckPath);
                    }

                    if (truckColor !== redColor) {
                        const truckGraphic = addTruck(truckPoint, trucks[i], truckColor);

                        if (truckColor === redColor) {
                            view.graphics.remove(truckGraphic);

                            truckPoint = new Point([truckPath[800], truckPath[801]]);
                            addTruck(truckPoint, trucks[i], truckColor);
                        }
                    }
                }
            }
        } else {
            alert("Query string greșit!\n Trebuie să fie de forma:\n\t?userid=<număr>&user_type=<număr>");
        }
    })

    function addTruck(point, truckData, truckColor) {
        const graphic = new Graphic({
            symbol: {
                type: "simple-marker",
                color: truckColor,
                outline: {
                    color: truckColor,
                },
                style: "square",
                size: "13px"
            },
            geometry: point,
            // attributes: attribs,
            popupTemplate: {
                content: `ID camion: ${truckData.camionid} <br>De la: ${truckData.locul_plecarii} <br>La: ${truckData.locul_sosirii} <br>Data plecare: ${truckData.data_plecarii} <br> Data sosire: ${truckData.data_sosirii}`
            }
        });

        view.graphics.add(graphic);

        return graphic;
    }

    function addGraphic(type, point) {
        const graphic = new Graphic({
            symbol: {
                type: "simple-marker",
                color: (type == "origin") ? [0, 255, 0] : [255, 0, 0],
                outline: {
                    color: (type === "origin") ? "white" : "black"
                },
                style: (type === "origin") ? "triangle" : "diamond",
                size: "13px"
            },
            geometry: point
        });
        view.graphics.add(graphic);

        return graphic;
    }

    async function getRoute(stopsArray, routeColor, show) {
        const routeParams = new RouteParameters({
            stops: new FeatureSet({
                features: stopsArray
            }),
        })

        const truckPath = await route.solve(routeUrl, routeParams)
            .then(data => {
                let truckPath;

                data.routeResults.forEach(function (result) {
                    result.route.symbol = {
                        type: "simple-line",
                        color: routeColor,
                        width: 4
                    };

                    // Coordonatele pe care camionul le va urma
                    // [i]   -> longitudine
                    // [i+1] -> latitudine
                    // i este par
                    // console.log(result.route.toJSON().geometry.paths[0].flat(Infinity));

                    if (show == true) {
                        view.graphics.add(result.route);
                    }

                    truckPath = result.route.toJSON().geometry.paths[0].flat(Infinity);
                });

                return truckPath;
            });

        return truckPath;
    }
});