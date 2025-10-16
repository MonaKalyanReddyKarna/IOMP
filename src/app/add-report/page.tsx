"use client";

import React, { useState, useEffect } from 'react';
import { useDisasterStore } from '@/zustand/useDisasterStore';
import { Disaster } from '@/types/disaster';

const DISASTER_TYPES = [
    'Flood', 'Earthquake', 'Cyclone', 'Drought', 'Tsunami', 'Wildfire',
    'Landslide', 'Volcano', 'Hurricane', 'Tornado', 'Blizzard', 'Pandemic',
    'Industrial Disaster', 'Train Accident', 'Dam Failure', 'Disease Outbreak',
    'Glacier Burst', 'Radioactive', 'Other'
];

export default function AddReportPage() {
	const addDisaster = useDisasterStore((s) => s.addDisaster);
	const setSection = useDisasterStore((s) => s.setSection);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [disasterType, setDisasterType] = useState("");
	const [location, setLocation] = useState("");
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [imageURLs, setImageURLs] = useState<string[]>([]);
	const [severity, setSeverity] = useState("moderate");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [locationDetected, setLocationDetected] = useState(false);

	// Auto-detect location on component mount
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					reverseGeocode(latitude, longitude);
				},
				(error) => {
					console.log('Geolocation error:', error);
					setLocationDetected(false);
				}
			);
		}
	}, []);

	async function reverseGeocode(lat: number, lng: number): Promise<void> {
		try {
			const key = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY as string | undefined;
			if (!key) return;
			
			const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${key}`);
			const data = await res.json();
			if (data?.results?.[0]?.formatted) {
				setLocation(data.results[0].formatted);
				setLocationDetected(true);
			}
		} catch (err) {
			console.log('Reverse geocoding failed:', err);
		}
	}

	async function geocodeLocation(loc: string): Promise<{ lat: number; lng: number } | null> {
		try {
			const key = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY as string | undefined;
			if (!key) return null;
			const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(loc)}&key=${key}`);
			const data = await res.json();
			if (data?.results?.[0]?.geometry) {
				return { lat: data.results[0].geometry.lat, lng: data.results[0].geometry.lng };
			}
		} catch (_) {
			return null;
		}
		return null;
	}

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		const newFiles = [...imageFiles, ...files].slice(0, 5); // Max 5 images
		setImageFiles(newFiles);
		
		// Create preview URLs
		const newURLs = newFiles.map(file => URL.createObjectURL(file));
		setImageURLs(newURLs);
	};

	const removeImage = (index: number) => {
		const newFiles = imageFiles.filter((_, i) => i !== index);
		const newURLs = imageURLs.filter((_, i) => i !== index);
		setImageFiles(newFiles);
		setImageURLs(newURLs);
	};

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSubmitting(true);
		setError(null);
		try {
			const coords = location ? await geocodeLocation(location) : null;
			
			// Convert uploaded images to base64 for storage (in real app, upload to server)
			const imageBase64s = await Promise.all(
				imageFiles.map(file => 
					new Promise<string>((resolve) => {
						const reader = new FileReader();
						reader.onload = () => resolve(reader.result as string);
						reader.readAsDataURL(file);
					})
				)
			);

			const newReport: Disaster = {
				_id: (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)),
				title: title.trim() || "Untitled Report",
				description: description.trim(),
				disasterType: disasterType.trim() || "Unknown",
				imageURLS: imageBase64s.length > 0 ? imageBase64s : [],
				postAuthorURL: "",
				postLink: "",
				clusterIdentifier: "manual",
				timestamp: new Date().toISOString(),
				location: location.trim(),
				coordinates: coords || { lat: 0, lng: 0 },
			};
			addDisaster(newReport);
			setSection("disasters");
			window.location.href = "/";
		} catch (err: any) {
			setError(err?.message || "Failed to add report");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-extrabold text-blue-900 mb-6">Add Disaster Report</h1>
			<form onSubmit={onSubmit} className="space-y-6 bg-white shadow-lg rounded-lg p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
						<input 
							value={title} 
							onChange={(e) => setTitle(e.target.value)} 
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
							required 
							placeholder="Brief description of the disaster"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Disaster Type *</label>
						<select 
							value={disasterType} 
							onChange={(e) => setDisasterType(e.target.value)} 
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							required
						>
							<option value="">Select disaster type</option>
							{DISASTER_TYPES.map(type => (
								<option key={type} value={type}>{type}</option>
							))}
						</select>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
					<textarea 
						value={description} 
						onChange={(e) => setDescription(e.target.value)} 
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
						rows={4} 
						placeholder="Detailed description of the disaster..."
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Location {locationDetected && <span className="text-green-600 text-xs">(Auto-detected)</span>}
						</label>
						<input 
							value={location} 
							onChange={(e) => setLocation(e.target.value)} 
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
							placeholder="City, State, Country"
						/>
						{locationDetected && (
							<p className="text-xs text-green-600 mt-1">✓ Location detected from your device</p>
						)}
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
						<select 
							value={severity} 
							onChange={(e) => setSeverity(e.target.value)} 
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="low">Low</option>
							<option value="moderate">Moderate</option>
							<option value="high">High</option>
							<option value="critical">Critical</option>
						</select>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">Images (Max 5)</label>
					<input 
						type="file" 
						multiple 
						accept="image/*" 
						onChange={handleImageUpload}
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					{imageURLs.length > 0 && (
						<div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
							{imageURLs.map((url, index) => (
								<div key={index} className="relative">
									<img 
										src={url} 
										alt={`Upload ${index + 1}`} 
										className="w-full h-32 object-cover rounded-lg border"
									/>
									<button
										type="button"
										onClick={() => removeImage(index)}
										className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
									>
										×
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				{error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
				
				<button 
					disabled={submitting} 
					className="w-full px-6 py-3 rounded-lg bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed font-medium"
				>
					{submitting ? 'Submitting Report...' : 'Submit Report'}
				</button>
			</form>
		</div>
	);
}
