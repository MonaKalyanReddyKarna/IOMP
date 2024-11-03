# Real-Time Disaster Information Aggregation Software

A comprehensive platform to aggregate, analyze, and display disaster-related data from multiple sources, facilitating efficient and timely disaster response.

## Problem Statement
**Smart India Hackathon 2024 - Problem Statement ID**: 1687  
**Title**: Real-Time Disaster Information Aggregation Software  
**Theme**: Disaster Management

## Overview
This project addresses the need for a unified platform that provides real-time disaster updates from diverse data sources, ensuring swift response and enhanced coordination among rescue teams, affected individuals, and administrators.

## Key Features
- **Data Aggregation**: Collects information from social media, news sites, government sources, and satellite imagery using web scraping and predictive ML models.
- **User Interfaces**: Tailored interfaces for three user types:
  - **Normal Users**: Report disasters and send SOS signals.
  - **Rescue Teams**: Locate and assist affected individuals.
  - **Admins**: Monitor and coordinate disaster response efforts.
- **Offline Capabilities**: Enables SOS signaling and user communication without internet through Bluetooth Low Energy (BLE) and WiFi Direct.
- **Three-Layer Response System**: Structured response based on disaster severity to optimize resource allocation.

## Unique Value Propositions
- **Multi-Source Data Integration**: Combines diverse data streams (social media, news, satellite) for a comprehensive view.
- **Predictive Analytics**: Uses ML models to forecast potential disasters for early preparation.
- **Offline Communication**: Allows essential communication during network outages.
- **Customizable Response**: Tailors response actions based on disaster scenarios.

## Technical Approach
- **Frontend**: React (web), Java (app)
- **Backend**: Python, Flask
- **APIs**: RESTful APIs
- **Authentication**: JWT/OAuth
- **Databases**: MongoDB (unstructured data), PostgreSQL (structured data)
- **Data Processing & ML**: TensorFlow, scikit-learn
- **Web Scraping**: BeautifulSoup, Scrapy
- **Real-Time Communication**: WebSockets, Socket.io; GPS, Mesh Networks for offline
- **Data Visualization**: D3.js, Chart.js

## Current Status
- 25% of the product has been developed; further build, testing, and validation are ongoing.

## Feasibility Analysis
- **Technical**: Leverages proven tech stacks and libraries for efficient development.
- **Financial**: Potential for grants and partnerships with NGOs and government agencies.
- **Market**: High demand for disaster response solutions among government agencies, NGOs, and relief organizations.
- **Operational**: Cross-platform support and real-time data processing ensure timely disaster updates.

## Challenges and Mitigation Strategies
- **Technical**: Modular design for seamless integration and load balancing for scalability.
- **Financial**: Scalable cloud services to optimize costs and diverse funding sources.
- **Market**: Pilot programs to showcase value and highlight unique features.
- **Operational**: Encryption for privacy and offline functionality with GPS and mesh networks.

## Impact and Benefits
### Positive Impacts
- **Improved Disaster Response**: Real-time data ensures faster response times.
- **Cost Savings**: Optimizes resources to reduce financial losses.
- **Community Empowerment**: Provides tools for communities to report and receive aid.

### Potential Benefits
- **Social**: Enhances access to real-time disaster information.
- **Economic**: Reduces downtime and creates new market opportunities.
- **Environmental**: Increases energy efficiency and reduces waste.

---

## References
- Pichiyana, V., et al. "Web Scraping using Natural Language Processing," Procedia Computer Science, 2023.
- Kaur, P., "Sentiment analysis using web scraping for live news data with ML," Materials Today: Proceedings, 2022.
- Ishiwatari, M., "Leveraging Drones for Effective Disaster Management," Progress in Disaster Science, 2024.

---

## Getting Started
For developers and contributors:
1. Clone the repository.
2. Install dependencies using `npm install` for frontend and `pip install -r requirements.txt` for backend.
3. Set up environment variables for API keys and database connections.
4. Run the development server.

## License
Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact
Team ATTENT10N  
For queries, please contact us via [email@example.com](mailto:email@example.com).
