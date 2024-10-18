# Arduino-Ohmmeter Project Documentation

## Abstract
The **Arduino-Ohmmeter** is an innovative project designed to measure electrical resistance using an Arduino microcontroller integrated with a Bluetooth module for wireless communication. The project involves a self-loading circuit that utilizes a voltage divider to calculate resistance values based on the measured voltage. A Python script retrieves the voltage data from the Arduino via Bluetooth, and a Node.js server (written in TypeScript) processes the data, stores it in a database, and sends it to a React front-end for visualization. This project showcases a full-stack solution for wireless data collection, storage, and visualization, suitable for educational or experimental use.

## Table of Contents
1. [Introduction](#introduction)
2. [Components](#components)
3. [System Overview](#system-overview)
4. [Circuit Design](#circuit-design)
5. [Software Architecture](#software-architecture)
6. [Database Design](#database-design)
7. [Data Flow](#data-flow)
8. [Future Improvements](#future-improvements)
9. [Conclusion](#conclusion)

---

## Introduction
The **Arduino-Ohmmeter** project is designed to measure electrical resistance utilizing an Arduino-based voltage divider circuit. By incorporating wireless Bluetooth communication, the system efficiently transmits data to a modern web technology stack for processing and visualization. This project features a Python script for data acquisition, a Node.js server for backend processing, and a React front-end that presents the measurement results in an accessible format.

---

## Components
- **Arduino Uno** (or compatible microcontroller)
- **Bluetooth Module** 
- **Transistors** as switches
- **Resistors** for the voltage divider circuit
- **Breadboard and jumper wires**
- **Power source** (battery or USB)
- **Computer with Bluetooth connectivity**
- **Software Stack**: Python, Node.js (TypeScript), React, MySQL/PostgreSQL (or any relational DB)

---


## System Overview

The system operates through the following stages:

1. **Data Acquisition (Arduino + Bluetooth)**:
   - The Arduino measures the voltage across a resistor in a voltage divider configuration.
   - This measured voltage data is transmitted wirelessly via Bluetooth to a Python script.

2. **Data Processing and Storage (Node.js + Database)**:
   - The Python script collects the voltage data from the Arduino.
   - The Node.js server processes the received data, performs the resistance calculations directly on the board, and stores the results in a database.

3. **Data Access and Visualization (Node.js + React)**:
   - The Node.js (TypeScript) server retrieves the stored data from the database.
   - The React front-end presents the data for both real-time and historical monitoring.

---
## Circuit Design
The core of the circuit is based on the voltage divider principle:
- Two resistors (one known and one unknown) are connected in series.
- The Arduino measures the voltage across the known resistor.
- Using the formula:

$$
R_2 = \left( \frac{V_{in}}{V_{out}} - 1 \right) \times R_1
$$


  the resistance of the unknown resistor is calculated. This data is sent to the Python script via Bluetooth.

---

Here’s a revised version of the **Software Architecture** section:

---

## Software Architecture

### Python Script:
- **Bluetooth Communication**: The Python script establishes a serial connection with the Bluetooth module to retrieve voltage data sent from the Arduino.
- **Data Transfer**: Once the voltage data is collected, the Python script transmits it to the Node.js server for further processing.

### Node.js Server:
- **Data Processing**: The server calculates the resistance using the received voltage data and stores both the voltage and calculated resistance values in the database.
- **API Layer**: The Node.js server functions as the backend API, providing access to the stored data for the React front-end.


### React Front-End:
- **Data Visualization**: Displays the real-time voltage and resistance data in charts and tables.
- **User Interface**: A clean, responsive interface for viewing live and historical data.

---

## Database Design
The system uses two tables to store the measured data:

1. **hardware_output**
   - `id`: Unique identifier for each record.
   - `outputVoltage`: The voltage measured by the Arduino.
   - `resistance`: Calculated resistance based on the voltage.

2. **finalOutput**
   - `id`: Unique identifier for each record.
   - `DateTime`: Timestamp of when the data was recorded.
   - `hardware_output_id`: Foreign key linking to the `hardware_output` table.

---

## Data Flow

1. **Data Acquisition**: The Arduino measures the voltage across the resistor and transmits this data via Bluetooth to the Python script.
2. **Data Retrieval**: The Python script collects the voltage data from the Arduino and forwards it to the Node.js server.
3. **Data Storage**: The Node.js server stores the received voltage data and the resistance values calculated directly on the Arduino board in the database, preparing the data for access.
4. **Data Presentation**: The React app retrieves the processed data from the Node.js server, displaying real-time and historical measurements for user interaction and visualization.

---

## Future Improvements
- **Real-Time Data Updates**: Implement WebSocket support for real-time data visualization on the front-end.
- **Enhanced Accuracy**: Incorporate a Wheatstone bridge to improve measurement accuracy, especially for low resistances.
- **Additional Measurement Capabilities**: Extend the system to measure other electrical properties like capacitance.

---

## Conclusion
The **Arduino-Ohmmeter** project demonstrates a complete end-to-end system for measuring and visualizing resistance values wirelessly. By integrating Arduino hardware with modern software technologies like Python, Node.js, and React, this project highlights the potential of IoT in practical applications and serves as an educational tool for both hardware and software enthusiasts.

---

## License
This project is open-sourced under the MIT License. Feel free to use, modify, and distribute this project as needed.
