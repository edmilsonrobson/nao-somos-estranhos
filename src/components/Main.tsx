import MainGame from "./MainGame";

const Main = () => {
    return (
        <div className="flex flex-col justify-between h-screen">
            <div className="py-4">
                <div className="flex justify-center">
                    <h1 className="text-red-500 text-2xl font-semibold">
                        Não Somos Estranhos
                    </h1>
                </div>
            </div>

            <div className="bg-blue-100 flex-1">
                <MainGame />
            </div>
            <div className="flex justify-center bg-red-500 text-white text-center">
                Feito por Ed com ♥. <br />
                Uso autorizado no date fitness :)
            </div>
        </div>
    );
};

export default Main;
