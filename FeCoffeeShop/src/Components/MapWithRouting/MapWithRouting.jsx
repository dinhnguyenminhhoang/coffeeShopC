import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const MapWithRouting = ({ branches, currentPosition, selectedBranch }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.remove();
        }

        if (currentPosition[0] !== 0 && currentPosition[1] !== 0) {
            mapRef.current = L.map("map").setView(currentPosition, 13);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapRef.current);

            branches.forEach((branch) => {
                L.marker(branch.position)
                    .addTo(mapRef.current)
                    .bindPopup(`<b>${branch.name}</b><br>${branch.address}`)
                    .openPopup();
            });

            if (selectedBranch) {
                L.Routing.control({
                    waypoints: [
                        L.latLng(currentPosition[0], currentPosition[1]),
                        L.latLng(
                            selectedBranch.position[0],
                            selectedBranch.position[1]
                        ),
                    ],
                    routeWhileDragging: true,
                }).addTo(mapRef.current);
            }
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, [currentPosition, branches, selectedBranch]);

    return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default MapWithRouting;
