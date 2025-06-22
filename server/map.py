import networkx as nx
import folium
import random
import math
import json
from folium.plugins import MarkerCluster
from IPython.display import HTML, display
# from google.colab import files

# Constants - Optimized for TN to KA route
SELLER_COORDS = (11.0168, 76.9558)  # Coimbatore
CONSUMER_COORDS = (12.9716, 77.5946)  # Bengaluru
NUM_WAREHOUSES = 150  # Increased density
NUM_LAST_MILE_HUBS = 50  # More last-mile options
MAX_HUB_DISTANCE = 150  # Tighter network
LAST_MILE_RADIUS = 20  # Focused urban coverage

# Professional color scheme
COLORS = {
    'seller': '#FF9900',  # Amazon Orange
    'consumer': '#232F3E',  # Amazon Navy
    'warehouse': '#146EB4',  # Amazon Blue
    'lastmile': '#37475A',  # Amazon Gray
    'time_path': '#E67E22',  # Carrot Orange
    'env_path': '#27AE60',  # Amazon Green
    'lastmile_path': '#F79B34'  # Light Orange
}

# Enhanced Haversine formula
def haversine(coord1, coord2):
    lat1, lon1 = coord1
    lat2, lon2 = coord2
    R = 6371  # Earth radius in km
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    a = (math.sin(dLat/2) * math.sin(dLat/2) +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dLon/2) * math.sin(dLon/2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c

# Strategic node placement along major highways
def generate_nodes():
    nodes = []

    # 1. Seller Node (Amazon Fulfillment Center)
    nodes.append({
        'id': 'seller',
        'name': 'Amazon Coimbatore FC',
        'lat': SELLER_COORDS[0],
        'lon': SELLER_COORDS[1],
        'type': 'seller',
        'capacity': '75,000 units/day',
        'operating_hours': '24/7'
    })

    # 2. Main Route Warehouses (NH-44 and NH-48)
    highway_nodes = [
        (11.3410, 77.7172, 'Amazon Erode FC'),
        (11.6643, 78.1460, 'Amazon Salem XFC'),
        (12.5198, 78.2138, 'Amazon Krishnagiri DC'),
        (12.3118, 76.6527, 'Amazon Mandya SC'),
        (12.9716, 77.5946, 'Amazon Bengaluru Gateway')
    ]

    # 3. Regional Warehouses (denser distribution)
    for i in range(NUM_WAREHOUSES):
        progress = random.uniform(0, 1)
        segment = int(progress * (len(highway_nodes)-1))
        segment = min(segment, len(highway_nodes)-2)

        base_lat, base_lon, _ = highway_nodes[segment]
        next_lat, next_lon, _ = highway_nodes[segment+1]
        segment_progress = (progress * (len(highway_nodes)-1)) % 1

        lat = base_lat + (next_lat - base_lat) * segment_progress
        lon = base_lon + (next_lon - base_lon) * segment_progress

        # Add strategic offset
        lat += random.uniform(-0.2, 0.2)
        lon += random.uniform(-0.2, 0.2)

        hub_type = random.choices(
            ['Sorting Center', 'Delivery Station', 'Cross Dock'],
            weights=[0.6, 0.3, 0.1]
        )[0]

        nodes.append({
            'id': f'warehouse_{i}',
            'name': f'Amazon {hub_type} {i+1}',
            'lat': lat,
            'lon': lon,
            'type': 'warehouse',
            'capacity': f'{random.randint(10,30)}k units/day',
            'service_level': random.choice(['Standard', 'Expedited', 'Same-Day'])
        })

    # 4. Last-Mile Hubs (strategic Bengaluru locations)
    bengaluru_hotspots = [
        (13.0355, 77.5970, 'Amazon Hebbal DSP'),
        (12.9592, 77.6974, 'Amazon Whitefield DSP'),
        (12.8994, 77.5849, 'Amazon Jayanagar DSP'),
        (12.9784, 77.6408, 'Amazon Indiranagar DSP'),
        (12.9255, 77.5468, 'Amazon Electronic City DSP')
    ]

    for i in range(NUM_LAST_MILE_HUBS):
        if i < len(bengaluru_hotspots):
            lat, lon, name = bengaluru_hotspots[i]
        else:
            center = random.choice(bengaluru_hotspots)
            lat, lon, _ = center
            lat += random.uniform(-0.1, 0.1)
            lon += random.uniform(-0.1, 0.1)
            name = f'Amazon Neighborhood Hub {i+1}'

        nodes.append({
            'id': f'lastmile_{i}',
            'name': name,
            'lat': lat,
            'lon': lon,
            'type': 'lastmile',
            'vehicles': random.choices(
                ['EV Bikes', 'E-Rickshaws', 'EV Vans', 'Diesel Vans'],
                weights=[0.4, 0.3, 0.2, 0.1]
            )[0],
            'delivery_radius': f'{random.randint(3,8)} km'
        })

    # 5. Consumer Node (Prime Customer)
    nodes.append({
        'id': 'consumer',
        'name': 'Prime Customer Delivery Point',
        'lat': CONSUMER_COORDS[0],
        'lon': CONSUMER_COORDS[1],
        'type': 'consumer',
        'service_tier': random.choice(['Standard', 'Expedited', 'Same-Day'])
    })

    return nodes

# Real-world edge attributes with Amazon logistics data
def generate_edge_attributes(distance):
    # Transport mode probabilities based on Amazon's India network
    transport_mode = random.choices(
        ['EV Truck', 'Diesel Truck', 'LNG Truck', 'Rail'],
        weights=[0.25, 0.5, 0.15, 0.1]
    )[0]

    # Mode-specific parameters
    if transport_mode == 'EV Truck':
        avg_speed = random.randint(50, 70)
        carbon_per_km = random.uniform(0.3, 0.7)
        cost_per_km = random.uniform(8, 12)
    elif transport_mode == 'Diesel Truck':
        avg_speed = random.randint(45, 65)
        carbon_per_km = random.uniform(1.5, 2.5)
        cost_per_km = random.uniform(6, 10)
    elif transport_mode == 'LNG Truck':
        avg_speed = random.randint(50, 70)
        carbon_per_km = random.uniform(0.8, 1.2)
        cost_per_km = random.uniform(7, 11)
    else:  # Rail
        avg_speed = random.randint(30, 50)
        carbon_per_km = random.uniform(0.2, 0.5)
        cost_per_km = random.uniform(4, 7)

    # Urban sensitivity factor (higher near cities)
    urban_sensitivity = random.uniform(0.8, 1.5)

    return {
        'distance': distance,
        'transport_mode': transport_mode,
        'avg_speed': avg_speed,
        'carbon_per_km': carbon_per_km,
        'cost_per_km': cost_per_km,
        'time': distance / avg_speed,
        'carbon': distance * carbon_per_km,
        'cost': distance * cost_per_km * urban_sensitivity,
        'urban_sensitivity': urban_sensitivity
    }

# Build optimized graph with Amazon-like network
def build_graph(nodes):
    G = nx.Graph()

    # Add nodes with metadata
    for node in nodes:
        G.add_node(node['id'], **node)

    # Create connections with Amazon-like network topology
    for i, node1 in enumerate(nodes):
        for j, node2 in enumerate(nodes[i+1:], i+1):
            coord1 = (node1['lat'], node1['lon'])
            coord2 = (node2['lat'], node2['lon'])
            distance = haversine(coord1, coord2)

            # Connection probability decreases with distance
            connection_prob = max(0, 1 - (distance/MAX_HUB_DISTANCE)**2)

            if (random.random() < connection_prob or
                distance < MAX_HUB_DISTANCE/3 or
                (node1['type'] == 'seller' and node2['type'] == 'warehouse') or
                (node2['type'] == 'lastmile' and node1['type'] == 'warehouse')):

                edge_attrs = generate_edge_attributes(distance)
                G.add_edge(node1['id'], node2['id'], **edge_attrs)

    # Ensure robust connectivity
    if not nx.has_path(G, 'seller', 'consumer'):
        # Connect to nearest 3 warehouses
        seller_neighbors = sorted(
            [n for n in G.nodes() if G.nodes[n]['type'] == 'warehouse'],
            key=lambda x: haversine(
                (G.nodes['seller']['lat'], G.nodes['seller']['lon']),
                (G.nodes[x]['lat'], G.nodes[x]['lon'])
            )
        )[:3]
        for neighbor in seller_neighbors:
            dist = haversine(
                (G.nodes['seller']['lat'], G.nodes['seller']['lon']),
                (G.nodes[neighbor]['lat'], G.nodes[neighbor]['lon'])
            )
            edge_attrs = generate_edge_attributes(dist)
            G.add_edge('seller', neighbor, **edge_attrs)

    return G

# Enhanced path finding with A* algorithm
def find_optimal_paths(G):
    """
    Finds optimal paths using the A* algorithm, which is more efficient
    for this type of problem than Dijkstra's algorithm.
    """

    def time_heuristic(u, v):
        # Heuristic for time-based search (distance / max_speed)
        u_coords = (G.nodes[u]['lat'], G.nodes[u]['lon'])
        v_coords = (G.nodes[v]['lat'], G.nodes[v]['lon'])
        # Max speed is 70 km/h as per generate_edge_attributes
        return haversine(u_coords, v_coords) / 70

    def carbon_heuristic(u, v):
        # Heuristic for carbon-based search (distance * min_carbon_output)
        u_coords = (G.nodes[u]['lat'], G.nodes[u]['lon'])
        v_coords = (G.nodes[v]['lat'], G.nodes[v]['lon'])
        # Min carbon is 0.2 kg/km as per generate_edge_attributes
        return haversine(u_coords, v_coords) * 0.2

    # Time-optimized path
    time_path = nx.astar_path(G, 'seller', 'consumer', weight='time', heuristic=time_heuristic)

    # Eco-optimized path
    env_path = nx.astar_path(G, 'seller', 'consumer', weight='carbon', heuristic=carbon_heuristic)

    # Ensure paths go through last-mile hubs
    def adjust_path(path):
        last_hubs = [n for n in path if G.nodes[n]['type'] == 'lastmile']
        if last_hubs:
            last_hub = last_hubs[-1]
            idx = path.index(last_hub)
            return path[:idx+1] + ['consumer']
        return path

    return adjust_path(time_path), adjust_path(env_path)

# Executive-grade visualization
def visualize_map(G, time_path, env_path):
    m = folium.Map(
        location=[(SELLER_COORDS[0] + CONSUMER_COORDS[0])/2,
                 (SELLER_COORDS[1] + CONSUMER_COORDS[1])/2],
        zoom_start=8,
        tiles='cartodbpositron'
    )

    # Cluster markers
    warehouse_cluster = MarkerCluster(name='Distribution Network').add_to(m)
    lastmile_cluster = MarkerCluster(name='Last-Mile Network').add_to(m)

    # Add nodes with popups
    for node in G.nodes():
        data = G.nodes[node]
        popup_content = f"""
        <div style="width: 250px">
            <h4 style="color: {COLORS[data['type']]}; margin-bottom: 5px;">{data['name']}</h4>
            <p><strong>Type:</strong> {data['type'].replace('seller', 'Fulfillment Center').replace('consumer', 'Customer').title()}</p>
            {f"<p><strong>Capacity:</strong> {data['capacity']}</p>" if 'capacity' in data else ''}
            {f"<p><strong>Vehicles:</strong> {data['vehicles']}</p>" if 'vehicles' in data else ''}
            <p><strong>Location:</strong> {data['lat']:.4f}, {data['lon']:.4f}</p>
        </div>
        """

        if data['type'] == 'seller':
            folium.Marker(
                [data['lat'], data['lon']],
                popup=popup_content,
                icon=folium.Icon(color=COLORS['seller'], icon='industry', prefix='fa')
            ).add_to(m)
        elif data['type'] == 'consumer':
            folium.Marker(
                [data['lat'], data['lon']],
                popup=popup_content,
                icon=folium.Icon(color=COLORS['consumer'], icon='home', prefix='fa')
            ).add_to(m)
        elif data['type'] == 'warehouse':
            folium.Marker(
                [data['lat'], data['lon']],
                popup=popup_content,
                icon=folium.Icon(color=COLORS['warehouse'], icon='warehouse', prefix='fa')
            ).add_to(warehouse_cluster)
        else:  # lastmile
            folium.Marker(
                [data['lat'], data['lon']],
                popup=popup_content,
                icon=folium.Icon(color=COLORS['lastmile'], icon='truck', prefix='fa')
            ).add_to(lastmile_cluster)

    # Add paths
    def add_path(path, color, name):
        coords = [[G.nodes[node]['lat'], G.nodes[node]['lon']] for node in path]
        distance = sum(G.edges[path[i], path[i+1]]['distance'] for i in range(len(path)-1))
        time = sum(G.edges[path[i], path[i+1]]['time'] for i in range(len(path)-1))
        carbon = sum(G.edges[path[i], path[i+1]]['carbon'] for i in range(len(path)-1))

        tooltip = f"""
        <div style="width: 300px">
            <h4 style="color: {color}">{name}</h4>
            <p><strong>Distance:</strong> {distance:.1f} km</p>
            <p><strong>Time:</strong> {time:.1f} hours</p>
            <p><strong>Carbon:</strong> {carbon:.1f} kg CO2</p>
        </div>
        """

        folium.PolyLine(
            coords,
            color=color,
            weight=4,
            opacity=0.8,
            tooltip=tooltip
        ).add_to(m)

    add_path(time_path, COLORS['time_path'], 'Time-Optimized Route')
    add_path(env_path, COLORS['env_path'], 'Eco-Optimized Route')

    # Highlight last-mile delivery
    last_mile_coords = [
        [G.nodes[env_path[-2]]['lat'], G.nodes[env_path[-2]]['lon']],
        [G.nodes['consumer']['lat'], G.nodes['consumer']['lon']]
    ]
    folium.PolyLine(
        last_mile_coords,
        color=COLORS['lastmile_path'],
        weight=5,
        dash_array='10, 5',
        tooltip='Last-Mile EV Delivery'
    ).add_to(m)

    # Add title
    title_html = '''
    <h3 align="center" style="font-size:16px">
    <b>Amazon India Logistics Network Optimization</b><br>
    Coimbatore to Bengaluru Supply Chain
    </h3>
    '''
    m.get_root().html.add_child(folium.Element(title_html))

    folium.LayerControl().add_to(m)

    return m

# Executive report generation
def generate_report(G, time_path, env_path):
    # Calculate metrics
    def path_metrics(path):
        distance = sum(G.edges[path[i], path[i+1]]['distance'] for i in range(len(path)-1))
        time = sum(G.edges[path[i], path[i+1]]['time'] for i in range(len(path)-1))
        carbon = sum(G.edges[path[i], path[i+1]]['carbon'] for i in range(len(path)-1))
        nodes = len(path)
        return distance, time, carbon, nodes

    time_dist, time_hours, time_co2, time_nodes = path_metrics(time_path)
    env_dist, env_hours, env_co2, env_nodes = path_metrics(env_path)

    # Create HTML report
    report_html = f"""
    <html>
    <head>
    <style>
    body {{ font-family: Arial, sans-serif; margin: 20px; }}
    .header {{ color: #232F3E; border-bottom: 2px solid #FF9900; padding-bottom: 10px; }}
    .metric {{ background: #F2F3F3; padding: 15px; margin: 10px 0; border-radius: 5px; }}
    .comparison {{ display: flex; justify-content: space-between; }}
    .path {{ flex: 1; margin: 0 10px; }}
    .improvement {{ color: #27AE60; font-weight: bold; }}
    .highlight {{ background: #232F3E; color: white; padding: 3px 5px; }}
    </style>
    </head>
    <body>
    <div class="header">
    <h1>Logistics Network Optimization Report</h1>
    <h2>Coimbatore to Bengaluru Supply Chain</h2>
    </div>

    <div class="metric">
    <h3>System Overview</h3>
    <p>Network contains <span class="highlight">{len(G.nodes())} nodes</span> and
    <span class="highlight">{len(G.edges())} connections</span> across Tamil Nadu and Karnataka.</p>
    </div>

    <div class="comparison">
    <div class="path">
    <h3>Time-Optimized Route</h3>
    <p>Distance: {time_dist:.1f} km</p>
    <p>Duration: {time_hours:.1f} hours</p>
    <p>Carbon: {time_co2:.1f} kg CO2</p>
    <p>Hubs Used: {time_nodes}</p>
    </div>

    <div class="path">
    <h3>Eco-Optimized Route</h3>
    <p>Distance: {env_dist:.1f} km</p>
    <p>Duration: {env_hours:.1f} hours (+{(env_hours-time_hours)/time_hours*100:.1f}%)</p>
    <p>Carbon: {env_co2:.1f} kg CO2 (<span class="improvement">-{(time_co2-env_co2)/time_co2*100:.1f}%</span>)</p>
    <p>Hubs Used: {env_nodes}</p>
    </div>
    </div>

    <div class="metric">
    <h3>Key Insights</h3>
    <ul>
    <li>Eco-route reduces carbon emissions by <span class="improvement">{(time_co2-env_co2)/time_co2*100:.1f}%</span> with only {(env_hours-time_hours):.1f} hour delay</li>
    <li>Network provides {len([n for n in G.nodes() if G.nodes[n]['type']=='lastmile'])} last-mile options in Bengaluru</li>
    <li>{len([e for e in G.edges() if G.edges[e]['transport_mode']=='EV Truck'])} EV routes available</li>
    </ul>
    </div>
    </body>
    </html>
    """

    with open('amazon_logistics_report.html', 'w') as f:
        f.write(report_html)

    return report_html

# Generate JSON report
def generate_json_report(G, time_path, env_path):
    # Calculate metrics
    def path_metrics(path):
        distance = sum(G.edges[path[i], path[i+1]]['distance'] for i in range(len(path)-1))
        time = sum(G.edges[path[i], path[i+1]]['time'] for i in range(len(path)-1))
        carbon = sum(G.edges[path[i], path[i+1]]['carbon'] for i in range(len(path)-1))
        nodes = len(path)
        return distance, time, carbon, nodes

    time_dist, time_hours, time_co2, time_nodes = path_metrics(time_path)
    env_dist, env_hours, env_co2, env_nodes = path_metrics(env_path)

    report_data = {
        "time_optimized_route": {
            "distance_km": round(time_dist, 1),
            "duration_hours": round(time_hours, 1),
            "carbon_kg_co2": round(time_co2, 1),
            "hubs_used": time_nodes
        },
        "eco_optimized_route": {
            "distance_km": round(env_dist, 1),
            "duration_hours": round(env_hours, 1),
            "carbon_kg_co2": round(env_co2, 1),
            "hubs_used": env_nodes,
            "duration_increase_percent": round((env_hours - time_hours) / time_hours * 100, 1),
            "carbon_decrease_percent": round((time_co2 - env_co2) / time_co2 * 100, 1)
        }
    }

    with open('amazon_logistics_summary.json', 'w') as f:
        json.dump(report_data, f, indent=4)

    return report_data

# Main execution for VS Code
if __name__ == '__main__':
    print("🚚 Building Amazon Logistics Network...")
    nodes = generate_nodes()
    G = build_graph(nodes)

    print("📊 Calculating Optimal Routes...")
    time_path, env_path = find_optimal_paths(G)

    print("🌍 Generating Executive Visualization...")
    m = visualize_map(G, time_path, env_path)
    m.save('amazon_logistics_map.html')

    print("📈 Preparing Executive Report...")
    report_html = generate_report(G, time_path, env_path)

    print("📋 Generating JSON Summary...")
    generate_json_report(G, time_path, env_path)

    print("💾 Saving network data...")
    with open('amazon_logistics_network.json', 'w') as f:
        json.dump(nx.node_link_data(G), f)

    print("\n✅ All outputs saved in current directory:")
    print(" - amazon_logistics_map.html")
    print(" - amazon_logistics_report.html")
    print(" - amazon_logistics_summary.json")
    print(" - amazon_logistics_network.json")
    print("\n📂 Open these files in your browser or use a Python web server to view them.")
