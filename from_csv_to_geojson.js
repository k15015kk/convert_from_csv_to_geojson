"use strict"

const fs = require('fs');
const {parse} = require('csv-parse/sync');

const target_csv_file = 'sample';

const csv_data = fs.readFileSync('csv/' + target_csv_file + '.csv');

const records = parse(csv_data, {
    columns: true,
});

console.log(records);

const features = records.map((data) => {
    const geometry = {
        "type": "Point",
        "coordinates": [
            parseFloat(data.longitude), 
            parseFloat(data.latitude),
        ],
    }

    const properties = {
        "altitude": parseFloat(data.altitude),
        "ellipsoidalAltitude": parseFloat(data.ellipsoidalAltitude),
        "floor": parseInt(data.floor),
        "horizontalAccuracy": parseFloat(data.horizontalAccuracy),
        "vericalAccuracy": parseFloat(data.vericalAccuracy),
        "speed": parseFloat(data.speed),
        "speedAccuracy": parseFloat(data.speedAccuracy),
        "course": parseFloat(data.course),
        "courseAccuracy": parseFloat(data.courseAccuracy),
        "timestamp": parseFloat(data.timestamp)
    }

    const feature = {
        "type": "Feature",
        "geometry": geometry,
        "properties": properties
    }

    return feature
});

const geojson = {
    "type": "FeatureCollection",
    "features": features
}

const geojson_data = JSON.stringify(geojson, null, '  ')
fs.writeFileSync('geojson/' + target_csv_file + '.geojson', geojson_data)
