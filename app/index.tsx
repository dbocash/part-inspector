import { Redirect } from 'expo-router';

const Home = () => {
    return (
        <Redirect href={"/(tabs)/table"}/>
    );
}

export default Home;
