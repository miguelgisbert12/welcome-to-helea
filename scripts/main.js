// -------------------------------------
// WELCOME TO HELEA
// Una aventura espacial
// -------------------------------------
// Diseñado y desarrollado por Miguel Gisbert Robert
// -------------------------------------

// -------------------------------------------------------
let gameVersion = "2.0.0"; // Versión actual del juego
// -------------------------------------------------------

const helexGoal = 1000; // Total de Helex necesario para completar el juego
const totalLevels = 4; // Total de niveles del juego disponibles

//------------------------------------------- VARIABLES DEL JUEGO ---------

const AssetCache = {
    images: {},
    audios: {},
    videos: {}
};

// Gestión del cache del juego

const assetsPreloadedVersionKey = "heleaAssetsPreloadedVersion";

function normalizeAssetPath(src) {
    if (typeof src !== "string") return src;
    const normalized = src.trim();
    if (normalized === "") return normalized;
    if (/^[a-zA-Z][a-zA-Z\d+-.]*:/.test(normalized) || normalized.startsWith("data:")) {
        return normalized;
    }
    if (normalized.startsWith("/")) {
        return normalized.replace(/\/\/+/g, "/");
    }
    return ("/" + normalized).replace(/\/\/+/g, "/");
}

function getNormalizedAsset(src) {
    return normalizeAssetPath(src);
}

function wasAssetsPreloaded() {
    return localStorage.getItem(assetsPreloadedVersionKey) === gameVersion;
}

function markAssetsPreloaded() {
    localStorage.setItem(assetsPreloadedVersionKey, gameVersion);
}

// Variables de la loading screen

const loadingPage = document.querySelector("#loading-screen");
const barraCarga = document.querySelector("#loading-bar");
const mensajeCarga = document.querySelector("#loading-msg");
const mensajeCargados = document.querySelector("#assets-loaded-msg");
const gameVersionTxt = document.querySelector("#game-version");
const loadingDecision = document.querySelector("#loading-decision");
const retryButton = document.querySelector("#retry-button");
const continueButton = document.querySelector("#continue-button");
const txtAssetsCorrupted = document.querySelector("#txt-assets-corrupted");

// Variables del fin del juego

const gameOverPage = document.querySelector("#game-over-screen");
const gameOverMusicIntro = document.querySelector("#gameover-music-intro");
const btnGoIntro = document.querySelector("#watch-intro");
const btnGoMain = document.querySelector("#go-to-main");
const mensajeFeedback = document.querySelector("#mensaje-feedback-over");
const endGameTitle = document.querySelector("#end-game-txt");
const iconOver = document.querySelector("#icon-over");

// Variables de la introducción

const startingPage = document.querySelector("#starting-page");
const typingSound = document.querySelector("#typing-dialogues");
const backgroundMusicIntro = document.querySelector("#background-music-intro");
const selectSound = document.querySelector("#button-sound");
const headerInstrucciones = document.querySelector("#instrucciones-header");
const headerInstruccionesTxt = document.querySelector("#instrucciones-header-txt");
const startBanner1 = document.querySelector("#start-banner1");
const startBanner2 = document.querySelector("#start-banner2");
const dialoguesBox = document.querySelector("#dialogues");
const headerDialogues = document.querySelector("#header-dialogues");
const txtDialogue = document.querySelector("#dialogue-txt");
const nameSpeaker = document.querySelector("#name-speaker");
const dialogueIndicator = document.querySelector("#dialogue-indicator");
const characterMaleUI = document.querySelector("#character-male-ui");
const characterFemaleUI = document.querySelector("#character-female-ui");
const characterNobinaryUI = document.querySelector("#character-nobinary-ui");
const characterAiraakUI = document.querySelector("#character-airaak-ui");
const characterMadreUI = document.querySelector("#character-madre-ui");
const btnAnteriorDialog = document.querySelector("#prev-dialogue");
const btnSkipDialog = document.querySelector("#skip-dialogues");
const heleaPlanet = document.querySelector("#helea-planet");
const naveEspacial = document.querySelector("#nave-espacial");
const btnOcultarDialogos = document.querySelector("#btn-ocultar-dg");
const choiceBox = document.querySelector("#banner-intro-choice");
const choiceGo = document.querySelector("#choice-go");
const choiceWakeup = document.querySelector("#choice-wakeup");
const selectCharacterBanner = document.querySelector("#select-character");
const characterOptions = document.querySelectorAll(".select-character-option");
const selectCharacterBtn = document.querySelector("#select-character-btn");
const chooseNameBanner = document.querySelector("#set-your-name");
const selectedCharacterDecoration = document.querySelector("#selected-character-decoration");
const selectNameBtn = document.querySelector("#set-your-name-btn");
const nameInput = document.querySelector("#player-name");
const personajeAsomado = document.querySelector("#personaje-asomado");

// Variables del menú principal

const initialGuide = document.querySelector("#overlay-guide");
const guideElements = document.querySelectorAll(".guide-element");
const characterAiraakGuide = document.querySelector("#character-airaak-welcome");
const instructionsGuideContainer = document.querySelector("#instructions-guide-container");
const menuPrincipal = document.querySelector("#main-page");
const menuMusic = document.querySelector("#main-menu-music");
const heleaStoryMusic = document.querySelector("#helea-story-music");
const mainMenuBlocks = document.querySelectorAll(".main-menu-block");
const openChestWaiting = document.querySelector("#open-chest-waiting");
const openChestSound = document.querySelector("#open-chest-sound");
const selectSound2 = document.querySelector("#button-sound2");
const backgroundScene = document.querySelector(".main-background-video");
const starsBackground = document.querySelector("#stars-background-main");
const seccionAjustes = document.querySelector("#settings-banner");
const btnAjustes = document.querySelector("#btn-ajustes");
const btnStory = document.querySelector("#btn-story");
const btnLogs = document.querySelector("#btn-logs");
const inOutElements = document.querySelectorAll(".inout");
const mainHeader = document.querySelector("#main-header");
const subtituloPrincipal = document.querySelector("#main-header h3");
const tituloPrincipal = document.querySelector("#main-header h1");
const iconoAjustes = document.querySelector("#icon-ajustes");
const iconoLlave = document.querySelector("#icon-llave");
const menuAjustes = document.querySelector("#settings-banner");
const menuAudiosBirthday = document.querySelector("#audios-birthday");
const characterMain = document.querySelector("#main-character");
const imgCharacter = document.querySelector("#character-img");
const moon = document.querySelector("#moon-img");
const contenedorBurbujas = document.querySelector("#contenedor-burbujas");
const textoFooter = document.querySelector("#txt-footer");
const storyMenu = document.querySelector("#story-menu");
const btnJugar = document.querySelector("#play-button");
const instructionsGuide = document.querySelector("#instructions-guide");
const dialogueIndicatorGuide = document.querySelector("#dialogue-indicator-guide");
const heleaStoryPage = document.querySelector("#helea-story-page");
const storySteps = document.querySelectorAll(".story-step");
const loadingStoryText = document.querySelector("#loading-txt-story");
const storyLoadingPage = document.querySelector("#story-loading-page");
const storyMenuContainer = document.querySelector("#story-menu-container");
const selectSound3 = document.querySelector("#button-sound3");
const logsMenu = document.querySelector("#logs-menu");
const btnCloseLogs = document.querySelector("#btn-close-logs");
const gameVersionLogs = document.querySelector("#game-version-logs");
const logsNotifDot = document.querySelector("#logs-notif-dot");
const lastUpdateDot = document.querySelector(".log-dot");
const greetingsGuide = document.querySelector("#greetings-guide");

// Variables del menú de historia de Helea

const btnCloseStory = document.querySelector("#btn-close-story-menu");
const btnArchivosHelea = document.querySelector("#archivos-helea-btn");
const btnPrimerContacto = document.querySelector("#primer-contacto-btn");

// Variables del menú de niveles

const moonLevelsUI = document.querySelector("#moon-levels-ui");
const characterLevelsUI = document.querySelector("#character-img-levels");
const levelsMenu = document.querySelector("#niveles-menu");
const selectLevels = document.querySelector("#planets-container");
const planetsLevelsContainers = document.querySelectorAll(".planet-level-container");
const planetsLevelsImg = document.querySelectorAll(".planet-level-selector");
const levelSelectedUI = document.querySelector("#level-selected-submenu");
const levelSelectedButtons = document.querySelector("#level-selected-buttons");
const planetSelectedInfo = document.querySelector("#planet-selected-info");
const planetSelectedImg = document.querySelector("#planet-selected");
const selectDifficultButton = document.querySelector("#play-level-btn");
const instructionsButton = document.querySelector("#learn-how-btn");
const instructionsPage = document.querySelector("#instructions-page");
const levelSelectDifficult = document.querySelector("#level-select-difficult");
const playLevelButton = document.querySelector("#play-level-btn-ready");
const levelSelectedDetails = document.querySelector("#level-selected-details");
const difficultButtons = document.querySelectorAll(".difficult-button");
const levelUnlockedEffect = document.querySelector("#level-unlocked");
const btnAllRecords = document.querySelector("#btn-all-records");
const iconTrophy = document.querySelector("#icon-trophy");
const allRecordsPage = document.querySelector("#all-records-page");

const loadingLevelMusic = document.querySelector("#loading-level-music");

// Variables de los niveles

const musicLevel1 = document.querySelector("#level1-music");
const musicIntroLevel1 = document.querySelector("#level1-music-intro");
const monsterEffect1 = document.querySelector("#level1-monster1");
const monsterEffect2 = document.querySelector("#level1-monster2");
const monsterEffect3 = document.querySelector("#level1-monster3");
const monsterEffect4 = document.querySelector("#level1-monster4");
const crowdEffect = document.querySelector("#level1-crowd");
const newRecordSound = document.querySelector("#new-record-sound");
const newRecordVoiceSound = document.querySelector("#new-record-voice-sound");
const levelCompletedSound = document.querySelector("#level-completed-sound");
const playLevelSound = document.querySelector("#play-level-sound");
const btnAjustesLevel = document.querySelector("#icon-ajustes-level");
const headerLevelSettings = document.querySelector("#header-level-settings");
const closeLevelSettingsContainer = document.querySelector("#close-level-settings");
const btnCloseSettingsLevel = document.querySelector("#btn-close-level-settings");
const levelCompletedVideo = document.querySelector("#level-completed-video");
const levelResumeVideo = document.querySelector("#level-resume-video");
const levelUI = document.querySelector("#level-page");
const levelResumePage = document.querySelector("#level-resume-page");
const headerLevel = document.querySelector("#header-level");
const loadingLevelPage = document.querySelector("#loading-level");
const levelTitle = document.querySelector("#loading-txt-planetaname");
const levelLoadingTxt = document.querySelector("#loading-txt-cargando");
const levelNumTxt = document.querySelector("#loading-txt-levelnum");
const levelHeaderTxt = document.querySelector("#level-current-header");
const dialoguesBoxLevels = document.querySelector("#dialogues-levels");
const headerDialoguesLevels = document.querySelector("#header-dialogues-levels");
const btnAnteriorDialogLevels = document.querySelector("#prev-dialogue-levels");
const btnSkipDialogLevels = document.querySelector("#skip-dialogues-levels");
const btnOcultarDialogosLevels = document.querySelector("#btn-ocultar-dg-levels");
const characterMaleUILevels = document.querySelector("#character-male-ui-levels");
const characterFemaleUILevels = document.querySelector("#character-female-ui-levels");
const characterNobinaryUILevels = document.querySelector("#character-nobinary-ui-levels");
const characterAiraakUILevels = document.querySelector("#character-airaak-ui-levels");
const characterGorkoUILevels = document.querySelector("#character-gorko-ui-levels");
const characterBaooUILevels = document.querySelector("#character-baoo-ui-levels");
const characterOktopoUILevels = document.querySelector("#character-oktopo-ui-levels");
const dialoguesContainerLevels = document.querySelector("#dialogues-container-levels");
const nameSpeakerContainerLevels = document.querySelector("#name-speaker-container-levels");
const nameSpeakerLevels = document.querySelector("#name-speaker-levels");
const dialogueTxtLevels = document.querySelector("#dialogue-txt-levels");
const dialogueIndicatorLevels = document.querySelector("#dialogue-indicator-levels");
const levelElements = document.querySelectorAll(".level-element");
const roundTxts = document.querySelectorAll(".round-txt");

const failTxts = document.querySelectorAll(".fail-txt");
const correctTxts = document.querySelectorAll(".correct-txt");
const nowYouTxt = document.querySelectorAll(".now-you-txt");
const puntuacionActual = document.querySelector("#puntuacion-actual-numberid");
const monsters = document.querySelectorAll(".monster");
const puntosGanados = document.querySelector("#puntos-ganados");
const vidas = document.querySelectorAll(".life");
const levelCompletedTxt = document.querySelector("#level-completed-txt");
const levelCompletedDetails = document.querySelector("#level-completed-details");
const txtsAppear = document.querySelectorAll(".txt-appear");
const scoreOrRecord = document.querySelector("#score-or-record");
const planetLevelEnded = document.querySelector("#planet-level-ended");
const levelCompletedTxtResume = document.querySelector("#level-completed-txt-resume");
const levelDifficultResume = document.querySelector("#level-difficult-resume");
const infoDataStats1 = document.querySelector("#info-data-stats1");
const infoDataStats2 = document.querySelector("#info-data-stats2");
const infoData1 = document.querySelector("#info-data1");
const infoData2 = document.querySelector("#info-data2");
const finalScore = document.querySelector("#final-score");
const recordDificultadTxt = document.querySelector("#record-dificultad-txt");
const recordDificultadNumber = document.querySelector("#record-dificultad-number");
const closeInfoLevel = document.querySelector("#close-info-level");
const mainMenuRight = document.querySelector("#main-menu-right");
const percentTxtFinalLevel = document.querySelector("#percent-txt-final-level");

const songName = document.querySelector("#song-name");
const songArtist = document.querySelector("#artist-name");
const timeContainer = document.querySelector("#time-container");
const timeBar = document.querySelector("#secondary-time-bar");
const infoSongContainer = document.querySelector("#info-song-container");
const audioWaveLevel2Container = document.querySelector("#audio-wave-level2-container");
const musicIntroLevel2 = document.querySelector("#level2-music-intro");
const correctAnswer = document.querySelector("#level2-correct-answer");
const wrongAnswer = document.querySelector("#level2-wrong-answer");

const musicLevel3 = document.querySelector("#level3-music");
const musicIntroLevel3 = document.querySelector("#level3-music-intro");
const miniGames = document.querySelectorAll(".minigame");
const speedController = document.querySelector("#speed-controller");
const speedControllers = document.querySelectorAll(".speed-controller-img");
const speedCounterTxt = document.querySelector("#speed-counter");
const whatToDoTxt = document.querySelector("#what-to-do-txt");
const countDownLv3 = document.querySelector("#countdown-counter-level3");
const progressBar = document.querySelector("#secondary-progressbar-lv3");
const gridFuelModules = document.querySelector("#fuel-grid-container");
const fuelModules = document.querySelectorAll(".fuel-module");
const targetCont = document.querySelector("#target-icons-container");
const dialsCont = document.querySelector("#dials-container");
const gridOrderContainer = document.querySelector("#minigame-order");
const rightStabilizer = document.querySelector("#right-stabilizer");
const leftStabilizer = document.querySelector("#left-stabilizer");
const goalAngleDisplay = document.querySelector("#objective-stable-txt");
const actualAngleDisplay = document.querySelector("#actual-stable-txt");
const naveDisplay = document.querySelector("#spaceship-front");
const btnAterrizar = document.querySelector("#land-ship");
const landingSound = document.querySelector("#landing-sound");
const errorLandingSound = document.querySelector("#error-landing-sound");
const areaToClean = document.querySelector("#area-to-clean");

const musicLevel4 = document.querySelector("#level4-music");
const musicIntroLevel4 = document.querySelector("#level4-music-intro");
const newHintBtn = document.querySelector("#new-hint-btn");
const tryBtn = document.querySelector("#try-btn");
const userMessageInput = document.querySelector("#your-answer");
const helexAlmacenadoBoxes = document.querySelectorAll(".helex-almacenado-box");
const scrollHints = document.querySelector("#scroll-hints");
const hintElements = document.querySelectorAll(".hint");
const newHintSound = document.querySelector("#new-hint-sound");

const level1Game = document.querySelector("#level1-game");
const level2Game = document.querySelector("#level2-game");
const level3Game = document.querySelector("#level3-game");
const level4Game = document.querySelector("#level4-game");

const levelResumeMusic = document.querySelector("#level-resume-music");

const positiveFeedback = [
    "¡CORRECTO!",
    "¡BIEN HECHO!",
    "¡ESO ES!",
    "¡SIGUE ASÍ!",
    "¡INCREÍBLE!",
    "¡PERFECTO!",
    "¡GENIAL!",
    "¡YA CASI LO TIENES!",
    "¡SÚPER!",
    "¡LO CONSEGUISTE!"
]

// Variables de las instrucciones de nivel

const steps = document.querySelectorAll(".instruction-step");
const nextBtn = document.querySelector("#next-inst");
const prevBtn = document.querySelector("#prev-inst");

const levelInstructions = {
    1: [
        {
            img: "/media/backgrounds/instructions/nivel1/instrucciones-1-1.png",
            text1: "Nivel 1",
            text2: "Instrucciones"
        },
        {
            img: "/media/backgrounds/instructions/nivel1/instrucciones-1-2.png",
            text1: "Cada Rockot representa un color",
            text2: "¡Fíjate bien!"
        },
        {
            img: "/media/backgrounds/instructions/nivel1/instrucciones-1-3.png",
            text1: "Observa la secuencia",
            text2: "Memorízala"
        },
        {
            img: "/media/backgrounds/instructions/nivel1/instrucciones-1-4.png",
            text1: "Toca los Rockots en el orden correcto",
            text2: "Repítela"
        },
        {
            img: "/media/backgrounds/instructions/nivel1/instrucciones-1-5.png",
            text1: "No te quedes sin vidas",
            text2: "¡Tienes sólo 3!"
        },
        {
            img: "/media/backgrounds/instructions/nivel1/instrucciones-1-6.png",
            text1: "Llega hasta la última ronda",
            text2: "Y consigue Helex"
        }
    ],

    2: [
        {
            img: "/media/backgrounds/instructions/nivel2/instrucciones-2-1.png",
            text1: "Nivel 2",
            text2: "Instrucciones"
        },
        {
            img: "/media/backgrounds/instructions/nivel2/instrucciones-2-2.png",
            text1: "A los Baoo les encanta la música",
            text2: "Escucha la canción"
        },
        {
            img: "/media/backgrounds/instructions/nivel2/instrucciones-2-3.png",
            text1: "Cuando la música pare",
            text2: "Completa la letra"
        },
        {
            img: "/media/backgrounds/instructions/nivel2/instrucciones-2-4.png",
            text1: "No hay mucho tiempo",
            text2: "Cuidado"
        },
        {
            img: "/media/backgrounds/instructions/nivel2/instrucciones-2-5.png",
            text1: "No te quedes sin vidas",
            text2: "¡Tienes sólo 3!"
        },
        {
            img: "/media/backgrounds/instructions/nivel2/instrucciones-2-6.png",
            text1: "Llega hasta la última ronda",
            text2: "Y consigue Helex"
        }
    ],

    3: [
        {
            img: "/media/backgrounds/instructions/nivel3/instrucciones-3-1.png",
            text1: "Nivel 3",
            text2: "Instrucciones"
        },
        {
            img: "/media/backgrounds/instructions/nivel3/instrucciones-3-2.png",
            text1: "Acelera con cuidado",
            text2: "Mantén la velocidad"
        },
        {
            img: "/media/backgrounds/instructions/nivel3/instrucciones-3-3.png",
            text1: "Déjalo impecable",
            text2: "Limpia la cabina"
        },
        {
            img: "/media/backgrounds/instructions/nivel3/instrucciones-3-4.png",
            text1: "¡Que no exploten!",
            text2: "Enfría los módulos"
        },
        {
            img: "/media/backgrounds/instructions/nivel3/instrucciones-3-5.png",
            text1: "Gira los diales",
            text2: "Descifra el código"
        },
        {
            img: "/media/backgrounds/instructions/nivel3/instrucciones-3-6.png",
            text1: "Estabiliza las alas",
            text2: "Y aterriza la nave"
        }
    ],

    4: [
        {
            img: "/media/backgrounds/instructions/nivel4/instrucciones-4-1.png",
            text1: "Nivel 4",
            text2: "Instrucciones"
        },
        {
            img: "/media/backgrounds/instructions/nivel4/instrucciones-4-2.png",
            text1: "Recibe pistas",
            text2: "Adivina la palabra secreta"
        },
        {
            img: "/media/backgrounds/instructions/nivel4/instrucciones-4-3.png",
            text1: "Pide nuevas pistas",
            text2: "Pero pierde Helex..."
        },
        {
            img: "/media/backgrounds/instructions/nivel4/instrucciones-4-4.png",
            text1: "Escribe la respuesta",
            text2: "¡Y comprueba!"
        },
        {
            img: "/media/backgrounds/instructions/nivel4/instrucciones-4-5.png",
            text1: "7 pistas por ronda",
            text2: "Pide las que necesites"
        },
        {
            img: "/media/backgrounds/instructions/nivel4/instrucciones-4-6.png",
            text1: "Adivina las palabras",
            text2: "Y consigue Helex"
        }
    ],
};

// Variables de la guía inicial

const initialGuideTxts = [
    'Accede al menú de <span class="marked-txt">Archivos de Helea</span> para conocer más sobre la historia del planeta.',
    'Accede al menú de <span class="marked-txt">Estado de Helea</span> para conocer tu progreso en el juego e informarte sobre la situación actual del planeta.',
    'Accede al menú de <span class="marked-txt">Ajustes</span> para modificar la configuración del juego a tu gusto o empezar una nueva partida desde cero.',
    '¡Pulsa el botón de <span class="marked-txt">Jugar</span> para acceder al menú de niveles del juego y empezar el desafío!',
];

// Variables del progreso de Helea

const btnHeleaState = document.querySelector("#btn-helex");
const heleaPlanetPage = document.querySelector("#helea-planet-progress");
const dialoguesBoxHelea = document.querySelector("#dialogues-helea");
const dialoguesContainerHelea = document.querySelector("#dialogues-container-helea");
const nameSpeakerContainerHelea = document.querySelector("#name-speaker-container-helea");
const nameSpeakerHelea = document.querySelector("#name-speaker-helea");
const dialogueTxtHelea = document.querySelector("#dialogue-txt-helea");
const dialogueIndicatorHelea = document.querySelector("#dialogue-indicator-helea");
const totalPointsTxt = document.querySelector("#total-points-txt");
const objectivePoints = document.querySelector("#objective-points");
const btnNews = document.querySelector("#btn-ver-noticias");
const btnCloseState = document.querySelector("#btn-volver-state");
const hideWhenNewsElements = document.querySelectorAll(".hide-when-news");
const characterKevinHelea = document.querySelector("#character-kevin");
const characterSoraHelea = document.querySelector("#character-sora");
const planetHeleaState = document.querySelector("#planet-helea-state");

// Variables de la configuración

const toggleMusic = document.querySelector("#toggle-music");
const toggleSound = document.querySelector("#toggle-sound-effects");
const btnBorrarDatos = document.querySelector("#btn-borrar-datos");
const bannerAlertDelete = document.querySelector("#banner-alert-delete");
const closeBannerAlert = document.querySelector("#close-banner-alert");
const btnBorrarDatosTotal = document.querySelector("#btn-borrar-datos-total");
const settingItemGolevels = document.querySelector("#setting-item-golevels");
const bannerGoLevels = document.querySelector("#banner-go-levels");
const closeBannerGolevels = document.querySelector("#close-banner-golevels");
const btnGolevels = document.querySelector("#btn-go-levels");
const btnGolevelsConfirm = document.querySelector("#btn-golevels-confirm");

// Variables de fin del juego

const endGameVideo = document.querySelector("#end-game-video");
const creditsMusic = document.querySelector("#credits-music");
const creditsVideo = document.querySelector("#credits-video");
const creditsPage = document.querySelector("#credits-page");
const creditsTxts = document.querySelectorAll(".credit");
const endGameVictory = document.querySelector("#end-game-victory");
const endGameCinematicMusic = document.querySelector("#end-game-cinematic-music");

// Variables globales y booleanas

let LOADER_MIN_TIME = 5000; // Tiempo mínimo de pantalla de carga para iniciar
let LOADER_MAX_TIME = 30000; // Tiempo máximo de pantalla de carga antes de la alerta
let loadStartTime = 0;
let realProgress = 0; // Progreso real de la barra de carga
let visualProgress = 0; // Progreso visual falso de la barra de carga
let assetsFinished = false; // Los assets han terminado de cargarse?
let smoothLoader = null;
let maxTimer = null;
let minTimer = null;
let changingMessage = null; // Mensaje cambiante de la página de carga
let voiceDialogue = null; // Voz del diálogo actual
let storyStepCount = 1;
let endGameStepCount = 1;
let stuckWatcher;

let setInitialGuide = false; // Control sobre la guía inicial --> ¿aparecerá al abrir el menú principal?
let guideProgress = 0; // Progreso de los textos de la guía
let openedInitialGuide = false; // Guía de inicio abierta?
let openedAjustes = false; // Menú de ajustes abierto?
let openedNiveles = false; // Menú de niveles abierto?
let openedLevelInstructions = false; // Instrucciones de niveles abierto?
let openedHeleaState = false; // Menú de estado de Helea abierto?
let openedResumePage = false; // Página de resumen del nivel abierta?
let openedWarning = false; // Mensaje de advertencia abierto?
let openedStoryMenu = false; // Menú de historia abierto?
let openedLogs = false; // Menú de logs abierto?
let openedAllRecords = false; // Menú de todos los récords abierto?
let openedHeleaStoryPage = false; // Página de la historia de Helea abierta?
let hiddenDialogues = false; // Diálogos ocultos?
let introChoiceDone = false; // Se ha tomado la decisión de la intro?
let introEnded = false; // Ha cabado la intro?
let chooseMode = false; // El usuario elige una opción
let levelPaused = false; // El juego está en pausa?
let selectedLevel = false; // Se ha seleccionado un nivel para jugar?
let news = false; // Sección de noticias abierta?

let difficultSelected = null; // Dificultad general seleccionada
let playingLevel = null; // Nivel en juego
let branch = null; // Rama narrativa tras el choice inicial

// Flujo del juego
let loadingCompleted = false; // Ha terminado de cargar el juego?
let loadingScreen = false; // Pantalla de carga del juego
let instrucciones1 = false; // Pantalla de instrucciones inicial
let instrucciones2 = false;
let selectingCharacter = false; // Pantalla de selección de personaje
let selectingName = false; // Pantalla de elección del nombre del jugador
let intro = false; // Introducción con diálogos
let game = false; // Juego en marcha?
let selectingDifficult = false; // Se está eligiendo la dificultad del nivel?
let isPlayingLevel = false; // Jugando un nivel?
let gameOver = false; // Fin del juego?

// Diálogos
let dialogoIndex = 1; // Diálogo actual. 0 por defecto para iniciar el juego
let dialogoExacto = null;
let escribiendo = false; // Se están escribiendo los diálogos?
let typingTimeout = null;

// Animaciones
let runningAnimation = false; // Animación activa?
let lightEffectsInterval = null;
let lightTimeouts = [];
let creditsInterval = null;
let loadingLevelInterval = null;
let currentPersonAudio = null;

// Instrucciones
let currentStep = 0;
let maxSteps = 0;


// Créditos
let creditCount = 0;

// Niveles y Helex
let levelColor = null;
let levelIntroEnded = false;
let feedbackMessage = 0;
let tryRecord = {}; // Indica si se ha conseguido un nuevo récord
let timer = null;

// Estado interno del juego
let gameState = {
    lastVersionSeen: "1.0.0", // última versión vista por el jugador
    newPlayer : true, // true para una nueva partida
    characterSelected: null, // personaje seleccionado
    nameCharacter: null, // nombre del jugador
    playerScore: 0, // 0 de inicio
    nivelesCompletos: [], // Dejar vacío
    nivelActual: 1, // 1 de inicio
    newLevelUnlocked: false, // false de inicio
    newVersionNotif: false, // false de inicio
    freeModeAfterWinning: false, // Modo libre al completar el juego
    highScores: {
        "level1": { "fácil": 0, "normal": 0, "difícil": 0 },
        "level2": { "fácil": 0, "normal": 0, "difícil": 0 },
        "level3": { "fácil": 0, "normal": 0, "difícil": 0 },
        "level4": { "fácil": 0, "normal": 0, "difícil": 0 },
        "level5": { "fácil": 0, "normal": 0, "difícil": 0 },
        "level6": { "fácil": 0, "normal": 0, "difícil": 0 },
        "level7": { "fácil": 0, "normal": 0, "difícil": 0 },
        "level8": { "fácil": 0, "normal": 0, "difícil": 0 }
    }
};

// Estado interno de los minijuegos del nivel 3
const fuelMinigameState = {
    modules: [],
    difficultyMultiplier: 1.0,
    currentGracePeriod: 180
};

const orderMinigameState = {
    symbols: ["👽", "🚀", "🌙", "⭐", "❤️", "💧"],
    targetSequence: [],
    playerSequence: [],
    currentIndex: 0
};

// Estado interno de los niveles
let level1State = {
    sequenceTimeouts: [],
    sequence: [],
    playerIndex: 0,
    round: 0,
    speed: 1000, // Velocidad de la secuencia
    isShowingSequence: false,
    readyforSequence: false,
    score: 0, // 0 de inicio
    maxRounds: 10, // Ajustar las rondas
    maxPointsEasy: 5, // Ajustar los puntos (fácil)
    maxPointsNormal: 10, // Ajustar los puntos (normal)
    maxPointsHard: 20, // Ajustar los puntos (difícil)
    lives: 3, // 3 vidas siempre
    correctRounds: 0,
    incorrectRounds: 0,
    dificultad: "normal", // Empieza en normal
    wasShowingSequence: false,
    wasBlocked: false,
    isTransitioningByW: false
};

let level2State = {
    musicPlaylist: [],
    blockedButtons: false,
    round: 0,
    currentSongIndex: 0,
    timer: null,
    warningTimer: null,
    timeRemaining: 0,
    pauseTimestamp: 0,
    isMusicPlaying: false,
    startTime: null,
    audioPlayer: new Audio(),
    timeRound: 5, // Segundos que tiene el jugador para contestar
    score: 0, // 0 de inicio
    maxRounds: 5, // Ajustar las rondas
    maxPointsEasy: 10, // Ajustar los puntos (fácil)
    maxPointsNormal: 20, // Ajustar los puntos (normal)
    maxPointsHard: 30, // Ajustar los puntos (difícil)
    lives: 3, // 3 vidas siempre
    correctRounds: 0,
    incorrectRounds: 0,
    dificultad: "normal", // Empieza en normal
    accumulatedTime: 0,
    feedbackTimeouts: [], 
    timeouts: new Set(),
    wasBlocked: false
};

let level3State = {
    miniGamesArray: [],
    blockedButtons: true,
    round: 0,
    timeRound: 10, // Segundos que tiene el jugador para resolver el minijuego
    score: 0, // 0 de inicio
    maxRounds: 5, // Ajustar las rondas
    maxPointsEasy: 10, // Ajustar los puntos (fácil)
    maxPointsNormal: 20, // Ajustar los puntos (normal)
    maxPointsHard: 30, // Ajustar los puntos (difícil)
    lives: 3, // 3 vidas siempre
    correctRounds: 0,
    incorrectRounds: 0,
    dificultad: "normal", // Empieza en normal
    canWinFuel: false,
    speedCounter: 0, // La velocidad de la nave
    isPressing: false, // El jugador está presionando el botón de velocidad?
    gameLoopId: null,
    aceleracion: 1.5, // Aceleración y deceleración de la nave
    deceleracion: 0.8,
    limiteInferior: 200, // Límites entre los que hay que mantener la velocidad
    limiteSuperior: 300,
    progress: 0,
    progressSpeed: 0.3, // Velocidad a la que avanza la barra
    timerRunning: false, // Está corriendo el tiempo?
    roundEnded: false, // Ha acabado la ronda?
    glitchInterval: null,
    currentlyTappingIndex: null,
    lastFrameTime: 0,
    intentosFallidosObligatorios: 0,
    margenError: 2,
    inclinacionActual: 0, // Inclinación actual de la nave
    inclinacionObjetivo: 0, // Objetivo de la inclinación de la nave
    rotationInterval: null,
    manchasRestantes: 0, // Manchas que hay que limpiar
    toquesPorMancha: 3, // Veces que hay que tocar cada mancha para que desaparezca
    assetsManchas: [
        "media/img/level3/cafe.png",
        "media/img/level3/nintendo.png",
        "media/img/level3/galleta.png",
        "media/img/level3/zapatilla.png",
        "media/img/level3/mosca.png",
        "media/img/level3/papel.png",
        "media/img/level3/libro.png",
        "media/img/level3/gafas.png",
        "media/img/level3/microfono.png",
        "media/img/level3/pescado.png",
        "media/img/level3/cubo-rubik.png",
        "media/img/level3/disco-musica.png",
    ]
};

let level4State = {
    wordSet: [],
    currentWordIndex: 0,
    hintsShown: 0, // Pistas que se han mostrado
    round: 0, // Ronda actual
    isShowingHint: false,
    readyforAnswer: false,
    score: 0, // 0 de inicio
    maxRounds: 5, // Ajustar las rondas
    maxPointsEasy: 20, // Ajustar los puntos (fácil)
    maxPointsNormal: 40, // Ajustar los puntos (normal)
    maxPointsHard: 50, // Ajustar los puntos (difícil)
    lives: 3, // 3 vidas siempre
    correctRounds: 0,
    incorrectRounds: 0,
    dificultad: "normal", // Empieza en normal
    blockedButtons: true,
    feedbackTimeouts: [], 
    activeTimeouts: [],
    wasBlocked: false
};

//------------------------------------- GUARDAR Y CARGAR LA PARTIDA ---------

// Guardar la partida

function saveGameState() {
    localStorage.setItem("gameState", JSON.stringify(gameState));
};

// Cargar la partida

function loadGameState() {
    const savedState = localStorage.getItem("gameState");

    if (savedState) {
        try {
            const parsedData = JSON.parse(savedState);
            gameState = { ...resetGameState(), ...parsedData };
        } catch (error) {
            console.error("Error al parsear el JSON, reseteando estado...", error);
            gameState = resetGameState();
        }
    } else {
        gameState = resetGameState();
        saveGameState();
    }
}

//------------------------------------- RESETEAR EL JUEGO ---------

function resetGameState() { // Resetear estado del juego

    return {
        lastVersionSeen: "1.0.0",
        newPlayer : true, 
        characterSelected: null,
        nameCharacter: null, 
        playerScore: 0, 
        nivelesCompletos: [],
        nivelActual: 1,
        newLevelUnlocked: false,
        newVersionNotif: false,
        freeModeAfterWinning: false,
        highScores: {
            "level1": { "fácil": 0, "normal": 0, "difícil": 0 },
            "level2": { "fácil": 0, "normal": 0, "difícil": 0 },
            "level3": { "fácil": 0, "normal": 0, "difícil": 0 },
            "level4": { "fácil": 0, "normal": 0, "difícil": 0 },
            "level5": { "fácil": 0, "normal": 0, "difícil": 0 },
            "level6": { "fácil": 0, "normal": 0, "difícil": 0 },
            "level7": { "fácil": 0, "normal": 0, "difícil": 0 },
            "level8": { "fácil": 0, "normal": 0, "difícil": 0 }
        }
    }
};

//------------------------------------------- TEXTOS Y ELEMENTOS DEL JUEGO ---------

// Mensajes de la pantalla de carga del juego

const loadingMessages = [
    "Cargando elementos...",
    "Preparando el entorno...",
    "Encendiendo estrellas...",
    "Estabilizando el núcleo...",
    "Ajustando gravedad...",
    "Calibrando sensores...",
    "Obteniendo coordenadas estelares...",
    "Calmando a los Baoo...",
    "Bailando con los Rockots...",
    "Buscando Helex...",
    "Charlando con Airaak...",
    "Viajando a Helea...",
    "Analizando planetas...",
    "Escapando del Gran Oktopo...",
]

// Audios de felicitación de cumpleaños

const personAudios = {
    miguel: "/media/music/audio-messages/audio-miguel.mp3",
    alba: "/media/music/audio-messages/audio-alba.mp3",
    carmina: "/media/music/audio-messages/audio-carmina.mp3",
    laura: "/media/music/audio-messages/audio-laura.mp3",
};

// Playlist de música Nivel 2

const easyPlaylist = [
    {
        nombre: "Dios Es Un Stalker",
        artista: "Rosalía",
        rutaInicial: "/media/music/level2/easyplaylist/dios-es-un-stalker/first-part.mp3",
        rutaFinal: "/media/music/level2/easyplaylist/dios-es-un-stalker/second-part.mp3",
        opciones: ["predicción", "intervención", "inspección"],
        correcta: "intervención",
        volumenPropio: 1
    },
    {
        nombre: "Laura No Está",
        artista: "Nek",
        rutaInicial: "/media/music/level2/easyplaylist/laura-no-esta/first-part.mp3",
        rutaFinal: "/media/music/level2/easyplaylist/laura-no-esta/second-part.mp3",
        opciones: ["le pienso", "la amo", "le veo"],
        correcta: "la amo",
        volumenPropio: 1
    },
    {
        nombre: "Mala Costumbre",
        artista: "Chiara Oliver",
        rutaInicial: "/media/music/level2/easyplaylist/mala-costumbre/first-part.mp3",
        rutaFinal: "/media/music/level2/easyplaylist/mala-costumbre/second-part.mp3",
        opciones: ["mes", "tren", "túnel"],
        correcta: "túnel",
        volumenPropio: 1
    },
    {
        nombre: "Messy",
        artista: "Lola Young",
        rutaInicial: "/media/music/level2/easyplaylist/messy/first-part.mp3",
        rutaFinal: "/media/music/level2/easyplaylist/messy/second-part.mp3",
        opciones: ["clever", "better", "tempted"],
        correcta: "clever",
        volumenPropio: 1
    },
    {
        nombre: "Pompeii",
        artista: "Bastille",
        rutaInicial: "/media/music/level2/easyplaylist/pompeii/first-part.mp3",
        rutaFinal: "/media/music/level2/easyplaylist/pompeii/second-part.mp3",
        opciones: ["clouds", "mountains", "dust"],
        correcta: "clouds",
        volumenPropio: 1
    },
    {
        nombre: "Wonderwall",
        artista: "Oasis",
        rutaInicial: "/media/music/level2/easyplaylist/wonderwall/first-part.mp3",
        rutaFinal: "/media/music/level2/easyplaylist/wonderwall/second-part.mp3",
        opciones: ["know", "realise", "believe"],
        correcta: "believe",
        volumenPropio: 1
    },
    {
        nombre: "Yellow",
        artista: "Coldplay",
        rutaInicial: "/media/music/level2/easyplaylist/yellow/first-part.mp3",
        rutaFinal: "/media/music/level2/easyplaylist/yellow/second-part.mp3",
        opciones: ["do", "move", "choose"],
        correcta: "do",
        volumenPropio: 1
    },
    {
        nombre: "Close Your Eyes",
        artista: "RHODES",
        rutaInicial: "/media/music/level2/easyplaylist/close-your-eyes/first-part.mp3",
        rutaFinal: "/media/music/level2/easyplaylist/close-your-eyes/second-part.mp3",
        opciones: ["saw", "know", "run"],
        correcta: "know",
        volumenPropio: 1
    },
    {
        nombre: "El Mundo Parece Una Canción de Lapido",
        artista: "JJ Fuentes",
        rutaInicial: "/media/music/level2/easyplaylist/el-mundo-parece-una-cancion-de-lapido/first-part.mp3",
        rutaFinal: "/media/music/level2/easyplaylist/el-mundo-parece-una-cancion-de-lapido/second-part.mp3",
        opciones: ["despellejan", "desesperan", "atraviesan"],
        correcta: "despellejan",
        volumenPropio: 1
    },
    {
        nombre: "Locked Away",
        artista: "R. City",
        rutaInicial: "/media/music/level2/easyplaylist/locked-away/first-part.mp3",
        rutaFinal: "/media/music/level2/easyplaylist/locked-away/second-part.mp3",
        opciones: ["sincerely", "wannabe", "honestly"],
        correcta: "honestly",
        volumenPropio: 1
    },
    {
        nombre: "Mejor Sin Miedo",
        artista: "Miriam Rodríguez",
        rutaInicial: "/media/music/level2/easyplaylist/mejor-sin-miedo/first-part.mp3",
        rutaFinal: "/media/music/level2/easyplaylist/mejor-sin-miedo/second-part.mp3",
        opciones: ["que me perdió", "se acabó", "se terminó"],
        correcta: "se terminó",
        volumenPropio: 1
    },
    {
        nombre: "Paparazzi",
        artista: "Lady Gaga",
        rutaInicial: "/media/music/level2/easyplaylist/paparazzi/first-part.mp3",
        rutaFinal: "/media/music/level2/easyplaylist/paparazzi/second-part.mp3",
        opciones: ["until you know me", "until you love me", "until you hold me"],
        correcta: "until you love me",
        volumenPropio: 1
    },
];

const normalPlaylist = [
    {
        nombre: "Cheap Thrills",
        artista: "Sia (ft. Sean Paul)",
        rutaInicial: "/media/music/level2/normalplaylist/cheap-thrills/first-part.mp3",
        rutaFinal: "/media/music/level2/normalplaylist/cheap-thrills/second-part.mp3",
        opciones: ["money", "diamond", "life"],
        correcta: "diamond",
        volumenPropio: 0.8
    },
    {
        nombre: "Conexión Psíquica",
        artista: "Aitana",
        rutaInicial: "/media/music/level2/normalplaylist/conexion-psiquica/first-part.mp3",
        rutaFinal: "/media/music/level2/normalplaylist/conexion-psiquica/second-part.mp3",
        opciones: ["psíquica", "música", "química"],
        correcta: "química",
        volumenPropio: 0.9
    },
    {
        nombre: "Only The Young",
        artista: "Brandon Flowers",
        rutaInicial: "/media/music/level2/normalplaylist/only-the-young/first-part.mp3",
        rutaFinal: "/media/music/level2/normalplaylist/only-the-young/second-part.mp3",
        opciones: ["start again", "fly away", "find a way"],
        correcta: "start again",
        volumenPropio: 1
    },
    {
        nombre: "Taking Pictures Of You",
        artista: "The Kooks",
        rutaInicial: "/media/music/level2/normalplaylist/taking-pictures-of-you/first-part.mp3",
        rutaFinal: "/media/music/level2/normalplaylist/taking-pictures-of-you/second-part.mp3",
        opciones: ["running away", "fading to gray", "trying to raise"],
        correcta: "running away",
        volumenPropio: 1
    },
    {
        nombre: "Those Eyes",
        artista: "New West",
        rutaInicial: "/media/music/level2/normalplaylist/those-eyes/first-part.mp3",
        rutaFinal: "/media/music/level2/normalplaylist/those-eyes/second-part.mp3",
        opciones: ["make me", "show me", "remind me"],
        correcta: "remind me",
        volumenPropio: 1
    },
    {
        nombre: "Boomerang",
        artista: "Imagine Dragons",
        rutaInicial: "/media/music/level2/normalplaylist/boomerang/first-part.mp3",
        rutaFinal: "/media/music/level2/normalplaylist/boomerang/second-part.mp3",
        opciones: ["moving on", "ready to go", "holding on"],
        correcta: "moving on",
        volumenPropio: 1
    },
    {
        nombre: "Forget Me",
        artista: "Lewis Capaldi",
        rutaInicial: "/media/music/level2/normalplaylist/forget-me/first-part.mp3",
        rutaFinal: "/media/music/level2/normalplaylist/forget-me/second-part.mp3",
        opciones: ["street", "dirt", "silk"],
        correcta: "dirt",
        volumenPropio: 1
    },
    {
        nombre: "Herbeira",
        artista: "Andrés Suárez",
        rutaInicial: "/media/music/level2/normalplaylist/herbeira/first-part.mp3",
        rutaFinal: "/media/music/level2/normalplaylist/herbeira/second-part.mp3",
        opciones: ["amanecen", "el campo", "en invierno"],
        correcta: "en invierno",
        volumenPropio: 1
    },
    {
        nombre: "Stay",
        artista: "The Kid LAROI",
        rutaInicial: "/media/music/level2/normalplaylist/stay/first-part.mp3",
        rutaFinal: "/media/music/level2/normalplaylist/stay/second-part.mp3",
        opciones: ["wasted", "spent", "let go"],
        correcta: "wasted",
        volumenPropio: 1
    },
    {
        nombre: "Trumpets",
        artista: "Jason Derulo",
        rutaInicial: "/media/music/level2/normalplaylist/trumpets/first-part.mp3",
        rutaFinal: "/media/music/level2/normalplaylist/trumpets/second-part.mp3",
        opciones: ["I wrote", "I know", "Let's go"],
        correcta: "I wrote",
        volumenPropio: 1
    },
    {
        nombre: "Superposition",
        artista: "Daniel Caesar",
        rutaInicial: "/media/music/level2/normalplaylist/superposition/first-part.mp3",
        rutaFinal: "/media/music/level2/normalplaylist/superposition/second-part.mp3",
        opciones: ["don't release me", "trust me baby", "take it easy"],
        correcta: "take it easy",
        volumenPropio: 1
    },
    {
        nombre: "Birds",
        artista: "Imagine Dragons",
        rutaInicial: "/media/music/level2/normalplaylist/birds/first-part.mp3",
        rutaFinal: "/media/music/level2/normalplaylist/birds/second-part.mp3",
        opciones: ["dreams will make", "life will make", "love will make"],
        correcta: "life will make",
        volumenPropio: 1
    },
];

const hardPlaylist = [
    {
        nombre: "Accidentally In Love",
        artista: "Counting Crows",
        rutaInicial: "/media/music/level2/hardplaylist/accidentally-in-love/first-part.mp3",
        rutaFinal: "/media/music/level2/hardplaylist/accidentally-in-love/second-part.mp3",
        opciones: ["heal", "find", "cure"],
        correcta: "cure",
        volumenPropio: 1
    },
    {
        nombre: "Golden",
        artista: "HUNTR/X",
        rutaInicial: "/media/music/level2/hardplaylist/golden/first-part.mp3",
        rutaFinal: "/media/music/level2/hardplaylist/golden/second-part.mp3",
        opciones: ["problem", "hunter", "childish"],
        correcta: "problem",
        volumenPropio: 1
    },
    {
        nombre: "Mirrors",
        artista: "Justin Timberlake",
        rutaInicial: "/media/music/level2/hardplaylist/mirrors/first-part.mp3",
        rutaFinal: "/media/music/level2/hardplaylist/mirrors/second-part.mp3",
        opciones: ["precious", "reflect", "bright"],
        correcta: "reflect",
        volumenPropio: 1
    },
    {
        nombre: "Little Talks",
        artista: "Of Monsters And Men",
        rutaInicial: "/media/music/level2/hardplaylist/little-talks/first-part.mp3",
        rutaFinal: "/media/music/level2/hardplaylist/little-talks/second-part.mp3",
        opciones: ["bodies", "eyes", "hearts"],
        correcta: "bodies",
        volumenPropio: 1
    },
    {
        nombre: "Too Much To Ask",
        artista: "Niall Horan",
        rutaInicial: "/media/music/level2/hardplaylist/too-much-to-ask/first-part.mp3",
        rutaFinal: "/media/music/level2/hardplaylist/too-much-to-ask/second-part.mp3",
        opciones: ["have left", "forget", "regret"],
        correcta: "regret",
        volumenPropio: 1
    },
    {
        nombre: "Everybody's Watching Me",
        artista: "The Neighbourhood",
        rutaInicial: "/media/music/level2/hardplaylist/everybodys-watching-me/first-part.mp3",
        rutaFinal: "/media/music/level2/hardplaylist/everybodys-watching-me/second-part.mp3",
        opciones: ["pressure me", "annoy me", "precious me"],
        correcta: "pressure me",
        volumenPropio: 1
    },
    {
        nombre: "3000 Miles",
        artista: "Emblem3",
        rutaInicial: "/media/music/level2/hardplaylist/3000-miles/first-part.mp3",
        rutaFinal: "/media/music/level2/hardplaylist/3000-miles/second-part.mp3",
        opciones: ["yesterday", "holidays", "more and more rain"],
        correcta: "yesterday",
        volumenPropio: 1
    },
    {
        nombre: "Rude",
        artista: "MAGIC!",
        rutaInicial: "/media/music/level2/hardplaylist/rude/first-part.mp3",
        rutaFinal: "/media/music/level2/hardplaylist/rude/second-part.mp3",
        opciones: ["did god bless", "whatcha do", "don't you know"],
        correcta: "don't you know",
        volumenPropio: 1
    },
    {
        nombre: "Verge",
        artista: "Owl City",
        rutaInicial: "/media/music/level2/hardplaylist/verge/first-part.mp3",
        rutaFinal: "/media/music/level2/hardplaylist/verge/second-part.mp3",
        opciones: ["the Moon", "the Earth", "the sky"],
        correcta: "the Earth",
        volumenPropio: 1
    },
    {
        nombre: "She Doesn't Mind",
        artista: "Sean Paul",
        rutaInicial: "/media/music/level2/hardplaylist/she-doesnt-mind/first-part.mp3",
        rutaFinal: "/media/music/level2/hardplaylist/she-doesnt-mind/second-part.mp3",
        opciones: ["and I know", "so come n' play", "when you ask"],
        correcta: "and I know",
        volumenPropio: 1
    },
];

// Pistas y respuestas Nivel 4

const easyWords = [

    {
        pista1: "El enemigo del sueño",
        pista2: "Agua caliente",
        pista3: "No para los niños",
        pista4: "O te gusta o no te gusta",
        pista5: "Sólo o con azúcar",
        pista6: "Molido o en grano",
        pista7: "Muy típico en el desayuno",
        respuestasCorrectas: ["café", "el café", "cafés", "un café", "cafe", "el cafe", "un cafe"],
    },
    {
        pista1: "No es ruido, es música",
        pista2: "El pulso del grupo",
        pista3: "'Billie Jean'",
        pista4: "Piel y metal",
        pista5: "Sin notas, solo tiempos",
        pista6: "Está en el rock; también en el pop",
        pista7: "Bombo, caja y platillo",
        respuestasCorrectas: ["batería","bateria", "la batería", "la bateria"],
    },
    {
        pista1: "Circular, pero también triangular",
        pista2: "Se guarda en un cuadrado",
        pista3: "Fuego y piedra, algo tradicional",
        pista4: "Mil formas de hacerla, mil sabores distintos",
        pista5: "Como en un Dominó",
        pista6: "Famoso en Italia y en el mundo entero",
        pista7: "¿Con o sin piña?",
        respuestasCorrectas: ["pizza", "la pizza", "una pizza", "pizzas"],
    },
    {
        pista1: "Prefiere la noche que el día",
        pista2: "Sigiloso y silencioso",
        pista3: "Camina sin dejar huellas",
        pista4: "Se lleva recuerdos del lugar",
        pista5: "Lo tuyo ahora es suyo",
        pista6: "Aficionado al oro y los diamantes",
        pista7: "Securitas Direct",
        respuestasCorrectas: ["ladrón", "ladrona", "ladron", "el ladrón", "un ladrón", "la ladrona", "una ladrona"],
    },
    {
        pista1: "Una sonrisa siempre en la cara",
        pista2: "Calza una talla de más",
        pista3: "Gusta a niños y a adultos",
        pista4: "Generalmente rojo y blanco",
        pista5: "Lleva mucho maquillaje siempre encima",
        pista6: "Protagonista de espectáculos",
        pista7: "Una nariz roja y redonda",
        respuestasCorrectas: ["payaso", "payasa", "un payaso", "el payaso", "la payasa", "payasos", "clown"],
    },
];

const normalWords = [

    {
        pista1: "Hace frío y calor",
        pista2: "Es fácil perderse",
        pista3: "Hay mucho silencio",
        pista4: "El sol quema",
        pista5: "Cuidado con las alucinaciones",
        pista6: "Mejor llevar túnicas y turbantes",
        pista7: "El agua es oro",
        respuestasCorrectas: ["desierto", "desiertos", "el desierto", "los desiertos"],
    },
    {
        pista1: "Curvas peligrosas",
        pista2: "Sin manos",
        pista3: "El libro de la selva",
        pista4: "Sangre fría",
        pista5: "ssssssshhhh",
        pista6: "Cascabel, Constrictor",
        pista7: "El pecado original",
        respuestasCorrectas: ["serpiente", "serpientes", "la serpiente", "una serpiente"],
    },
    {
        pista1: "Le gusta la lluvia",
        pista2: "Se puede ver, pero no tocar",
        pista3: "También le gusta el sol",
        pista4: "Es efímero",
        pista5: "Caldero de oro",
        pista6: "Número 7",
        pista7: "Tiene muchos colores",
        respuestasCorrectas: ["arcoíris", "arcoiris", "arco iris", "arco íris", "el arcoíris", "el arco íris", "el arco iris"],
    },
    {
        pista1: "Puede ser de piedra",
        pista2: "Refugio y protección",
        pista3: "También puede ser de arena",
        pista4: "Inexpugnable",
        pista5: "Viene de la Edad Media",
        pista6: "Residencia de reyes y caballeros",
        pista7: "Grandes torres y murallas",
        respuestasCorrectas: ["castillo", "el castillo", "castillos", "alcázar", "fortaleza"],
    },
    {
        pista1: "Fusión de dos almas",
        pista2: "No cuesta nada, pero vale mucho",
        pista3: "La duración importa",
        pista4: "Calidez humana",
        pista5: "Manos en la espalda",
        pista6: "Rodear a alguien",
        pista7: "Entre amigos, familia o pareja",
        respuestasCorrectas: ["abrazo", "un abrazo", "abrazos", "el abrazo"],
    },
    
];

const hardWords = [

    {
        pista1: "Luz y oscuridad",
        pista2: "Quieres mirar, pero debes tener cuidado",
        pista3: "Excepcional, ocasional",
        pista4: "Un anillo de fuego",
        pista5: "Solar o lunar",
        pista6: "Alineación perfecta",
        pista7: "La luna oculta al sol",
        respuestasCorrectas: ["eclipse", "un eclipse", "eclipses", "eclipse de sol", "eclipse de luna"],
    },
    {
        pista1: "¿Libélula?",
        pista2: "Libertad de movimiento",
        pista3: "Tiene cuchillas",
        pista4: "(H)",
        pista5: "Vigilancia aérea",
        pista6: "Alza el vuelo verticalmente",
        pista7: "Aparece en películas de acción",
        respuestasCorrectas: ["helicóptero", "helicoptero", "un helicóptero", "un helicoptero"],
    },
    {
        pista1: "Late sin corazón",
        pista2: "Corre sin pies ni piernas",
        pista3: "Un brazo pequeño",
        pista4: "Le miran mucho, por algo más que por su belleza",
        pista5: "Vive en la arena o también en el cuarzo",
        pista6: "AM o PM",
        pista7: "Con correa o colgado en la pared",
        respuestasCorrectas: ["reloj", "relojes", "el reloj", "un reloj"],
    },
    {
        pista1: "Luz blanca y ojos fijos",
        pista2: "El sonido de un zumbido agudo",
        pista3: "Trabaja en un palacio de marfil",
        pista4: "El terror para muchos",
        pista5: "Un sillón, pero no para descansar",
        pista6: "Arregla las teclas del piano",
        pista7: "Especialista médico",
        respuestasCorrectas: ["dentista", "el dentista", "la dentista", "un dentista", "odontólogo", "odontóloga"],
    },
    {
        pista1: "Muchas vidas, un solo lazo",
        pista2: "Belleza con fecha de caducidad",
        pista3: "Aromático",
        pista4: "Romántico, especial",
        pista5: "Beben agua en un jarrón",
        pista6: "Vuelan al final de las bodas",
        pista7: "Cortadas cuidadosamente",
        respuestasCorrectas: ["ramo de flores", "ramo", "ramos", "un ramo", "el ramo"],
    },
];

// ELEMENTOS DEL JUEGO
// Actualizados el 05/05/2026

const mainMenuElements = [
    "media/assets/asset1.png",
    "media/assets/asset2.png",
    "media/assets/asset3.png",
    "media/assets/asset4.webp",
    "media/assets/asset5.webp",
    "media/assets/asset6.png",
    "media/assets/asset7.jfif",
    "media/assets/asset8.webp",
    "media/assets/asset9.png",
    "media/assets/asset10.webp",
    "media/assets/asset11.png",
    "media/assets/asset12.png",
    "media/assets/asset13.png",
    "media/assets/asset14.webp",
    "media/assets/asset15.png",
    "media/assets/asset16.webp",
    "media/assets/asset17.jpg",
    "media/assets/asset18.png",
    "media/assets/asset19.png",
    "media/assets/asset20.png",
    "media/assets/asset21.png",
    "media/assets/asset22.png",
    "media/assets/asset23.webp",
    "media/assets/asset24.png",
    "media/assets/asset25.webp",
    "media/assets/asset26.png",
    "media/assets/asset27.webp",
    "media/assets/asset28.png",
    "media/assets/asset29.png",
    "media/assets/asset31.png",
    "media/assets/asset32.png",
    "media/assets/asset33.png",
    "media/assets/asset34.webp",
    "media/assets/asset35.webp",
    "media/assets/asset36.png",
    "media/assets/asset37.png",
    "media/assets/asset38.webp",
    "media/assets/asset39.png",
    "media/assets/asset40.png",
    "media/assets/asset41.png",
    "media/assets/asset42.webp",
    "media/assets/asset43.webp",
    "media/assets/asset44.webp",
    "media/assets/asset45.png",
    "media/assets/asset46.webp",
    "media/assets/asset47.png",
    "media/assets/asset48.jpg",
    "media/assets/asset49.png",
    "media/assets/asset50.jpg",
    "media/assets/asset51.jpg",
    "media/assets/asset52.jpg",
    "media/assets/asset53.jpg",
    "media/assets/asset54.png",
    "media/assets/asset55.webp",
    "media/assets/asset56.png",
    "media/assets/asset57.png",

    "/media/backgrounds/instructions/nivel1/instrucciones-1-1.png",
    "/media/backgrounds/instructions/nivel1/instrucciones-1-2.png",
    "/media/backgrounds/instructions/nivel1/instrucciones-1-3.png",
    "/media/backgrounds/instructions/nivel1/instrucciones-1-4.png",
    "/media/backgrounds/instructions/nivel1/instrucciones-1-5.png",
    "/media/backgrounds/instructions/nivel1/instrucciones-1-6.png",
    "/media/backgrounds/instructions/nivel2/instrucciones-2-1.png",
    "/media/backgrounds/instructions/nivel2/instrucciones-2-2.png",
    "/media/backgrounds/instructions/nivel2/instrucciones-2-3.png",
    "/media/backgrounds/instructions/nivel2/instrucciones-2-4.png",
    "/media/backgrounds/instructions/nivel2/instrucciones-2-5.png",
    "/media/backgrounds/instructions/nivel2/instrucciones-2-6.png",
    "/media/backgrounds/instructions/nivel3/instrucciones-3-1.png",
    "/media/backgrounds/instructions/nivel3/instrucciones-3-2.png",
    "/media/backgrounds/instructions/nivel3/instrucciones-3-3.png",
    "/media/backgrounds/instructions/nivel3/instrucciones-3-4.png",
    "/media/backgrounds/instructions/nivel3/instrucciones-3-5.png",
    "/media/backgrounds/instructions/nivel3/instrucciones-3-6.png",
    "/media/backgrounds/instructions/nivel4/instrucciones-4-1.png",
    "/media/backgrounds/instructions/nivel4/instrucciones-4-2.png",
    "/media/backgrounds/instructions/nivel4/instrucciones-4-3.png",
    "/media/backgrounds/instructions/nivel4/instrucciones-4-4.png",
    "/media/backgrounds/instructions/nivel4/instrucciones-4-5.png",
    "/media/backgrounds/instructions/nivel4/instrucciones-4-6.png",

    "/media/backgrounds/loading-pages/level1.png",
    "/media/backgrounds/loading-pages/level2.png",
    "/media/backgrounds/loading-pages/level3.png",
    "/media/backgrounds/loading-pages/level4.png",

    "/media/backgrounds/helea-destroyed.png",
    "/media/backgrounds/helea-inside.png",
    "/media/backgrounds/interior-nave.png",
    "/media/backgrounds/interior-nave-off.png",
    "/media/backgrounds/spaceship-window.jpg",
    "/media/backgrounds/helea-outside.png",
    "/media/backgrounds/bed.png",
    "/media/backgrounds/bedroom.png",
    "/media/backgrounds/bedroom-dark.png",
    "/media/backgrounds/game-over-dark.png",
    "/media/backgrounds/window.png",
    "/media/backgrounds/helea-story-loading.png",

    "/media/icons/icon-back.png",
    "/media/icons/icon-back-white.png",
    "/media/icons/icon-book.png",
    "/media/icons/icon-close-white.png",
    "/media/icons/icono-config.png",
    "/media/icons/icon-headphones.png",
    "/media/icons/icon-live.png",
    "/media/icons/icon-more.png",
    "/media/icons/icon-pause.png",
    "/media/icons/icon-play.png",
    "/media/icons/icono-llave.png",
    "/media/icons/play-button.png",
    "/media/icons/icon-eye.png",
    "/media/icons/icon-eye-closed.png",

    "/media/img/planets/planet1.png",
    "/media/img/planets/planet2.png",
    "/media/img/planets/planet3.png",
    "/media/img/planets/planet4.png",
    "/media/img/planets/planet5.png",
    "/media/img/planets/planet6.png",
    "/media/img/planets/planet7.png",
    "/media/img/planets/planet8.png",

    "/media/img/airaak.png",
    "/media/img/helea-planet.png",
    "/media/img/helea-state1.png",
    "/media/img/helea-state2.png",
    "/media/img/helea-state3.png",
    "/media/img/helea-state4.png",
    "/media/img/kevin.png",
    "/media/img/sora.png",
    "/media/img/energia.png",
    "/media/img/heleax.png",
    "/media/img/llave.png",
    "/media/img/moon.png",
    "/media/img/nave-espacial.webp",
    "/media/img/madre.png",
    "/media/img/teddy-bear.png",

    "/media/videos/floating-space.mp4",
    "/media/videos/fondo_estrellas.mp4",
];

const heleaStoryElements = [
    "/media/backgrounds/story-of-helea/story1.png",
    "/media/backgrounds/story-of-helea/story2.png",
    "/media/backgrounds/story-of-helea/story3.png",
    "/media/backgrounds/story-of-helea/story4.png",
    "/media/backgrounds/story-of-helea/story5.png",
    "/media/backgrounds/story-of-helea/story6.png",
    "/media/backgrounds/story-of-helea/story7.png",
    "/media/backgrounds/story-of-helea/story8.png",
    "/media/backgrounds/story-of-helea/story9.png",
    "/media/backgrounds/story-of-helea/story10.png",
    "/media/backgrounds/story-of-helea/story11.png",
    "/media/backgrounds/story-of-helea/story12.png",
    "/media/backgrounds/story-of-helea/story13.png",
    "/media/backgrounds/story-of-helea/story14.png",
    "/media/backgrounds/story-of-helea/story15.png",
    "/media/backgrounds/story-of-helea/story16.png",
];

const genericElements = [

    "/media/icons/icono-config-white.png",

    "/media/img/life.png",
    "/media/img/monton-helex.png",

    "/media/videos/level-completed.mp4",
    "/media/videos/level-completed-resume.mp4",
    "/media/videos/end-game.mp4",
    "/media/videos/credits-video.mp4"
];

const level1Elements = [
    
    "/media/backgrounds/level-backgrounds/level1.png",
    "/media/backgrounds/level-backgrounds/level1-dance.png",
    
    "/media/backgrounds/game-over-level1.png",
    
    "/media/img/level1/monster1.png",
    "/media/img/level1/monster2.png",
    "/media/img/level1/monster3.png",
    "/media/img/level1/monster4.png",
    "/media/img/level1/monster-music.png",

    "/media/img/disco-ball.png",
    "/media/img/gorko.png",
];

const level2Elements = [

    "/media/backgrounds/level-backgrounds/level2-1.png",
    "/media/backgrounds/level-backgrounds/level2-2.png",
    "/media/backgrounds/level-backgrounds/level2-3.png",
    "/media/backgrounds/level-backgrounds/level2-space.png",

    "/media/backgrounds/game-over-level2.png",

    "/media/img/headphones.png",
    "/media/img/astronaut.png",
    "/media/img/baoo.png",
];

const level3Elements = [

    "/media/backgrounds/level-backgrounds/level3-1.png",
    "/media/backgrounds/level-backgrounds/level3-2.png",
    "/media/backgrounds/level-backgrounds/level3-3.png",
    "/media/backgrounds/level-backgrounds/level3-4.png",
    "/media/backgrounds/level-backgrounds/level3-5.png",
    "/media/backgrounds/level-backgrounds/level3-6.png",
    "/media/backgrounds/level-backgrounds/level3-controls.png",

    "/media/backgrounds/game-over-level3.png",

    "/media/img/level3/speed-controller1.png",
    "/media/img/level3/speed-controller2.png",
    "/media/img/level3/cafe.png",
    "/media/img/level3/gafas.png",
    "/media/img/level3/galleta.png",
    "/media/img/level3/libro.png",
    "/media/img/level3/mosca.png",
    "/media/img/level3/nintendo.png",
    "/media/img/level3/papel.png",
    "/media/img/level3/zapatilla.png",
    "/media/img/level3/microfono.png",
    "/media/img/level3/pescado.png",
    "/media/img/level3/cubo-rubik.png",
    "/media/img/level3/disco-musica.png",

    "/media/img/red-button.png",
];

const level4Elements = [

    "/media/backgrounds/level-backgrounds/level4-1.png",
    "/media/backgrounds/level-backgrounds/level4-2.png",
    "/media/backgrounds/level-backgrounds/level4-3.png",
    "/media/backgrounds/level-backgrounds/level4-4.png",
    "/media/backgrounds/level-backgrounds/level4-5.png",
    "/media/backgrounds/level-backgrounds/level4-6.png",
    "/media/backgrounds/level-backgrounds/level4-7.png",
    "/media/backgrounds/level-backgrounds/level4-boat.png",

    "/media/img/oktopo.png",
    "/media/img/coffee-cup.png",

    "/media/backgrounds/game-over-level4.png",
];

// TEXTOS DE LOS DIÁLOGOS

const dialogosIntroBase = [
    { // Diálogo 1
        speaker: "{player}",
        texto: "Uaaaaa, ¿dónde estoy?", 
        emotion: "confused",
        scene: "nave"
    },
    { // Diálogo 2
        speaker: "???", 
        texts: {
            male: "Por fin despiertas, humano. Ya empezaba a preocuparme.",
            female: "Por fin despiertas, humana. Ya empezaba a preocuparme.",
            nobinary: "Por fin despiertas. Ya empezaba a preocuparme."
        }, 
        emotion: "normal",
        scene: "nave",
        voice: "intro-voice1"   
    },
    { // Diálogo 3
        speaker: "{player}", 
        texto: "¿Qué es este sitio? Está todo demasiado... tranquilo.", 
        emotion: "confused",
        scene: "naveMediana" 
    },
    { // Diálogo 4
        speaker: "???", 
        texto: "Estamos en mitad del espacio, a años luz de la Tierra. Aquí todo es silencio, te acabarás acostumbrando.", 
        emotion: "normal",
        scene: "naveGrande",
        voice: "intro-voice2"  
    },
    { // Diálogo 5
        speaker: "{player}", 
        texto: "Pero  no entiendo nada, ¿estoy soñando?", 
        emotion: "confused",
        scene: "interiorNave"  
    },
    { // Diálogo 6
        speaker: "???",
        texts: {
            male: "Jajaja pobrecillo, siento tanto lío, debes estar un poco desconcertado. Deja que te lo explique todo.",
            female: "Jajaja pobrecilla, siento tanto lío, debes estar un poco desconcertada. Deja que te lo explique todo.",
            nobinary: "Jajaja pobre, siento tanto lío, debes estar un poco desconcertade. Deja que te lo explique todo."
        },  
        emotion: "normal",
        scene: "interiorNave",
        voice: "intro-voice3"  
    },
    { // Diálogo 7
        speaker: "Airaak", 
        texto: "Soy Airaak, la líder de los Heleanos. ¡Encantada de conocerte! Vivimos en un pequeño planeta llamado Helea. No es muy grande, pero es nuestro hogar.", 
        emotion: "normal",
        scene: "planetaHelea",
        voice: "intro-voice4"  
    },
    { // Diálogo 8
        speaker: "Airaak", 
        texto: "Verás, mi gente está muy preocupada por el futuro de Helea. El planeta se está muriendo, y nosotros con él.", 
        emotion: "normal",
        scene: "interiorHelea",
        voice: "intro-voice5"  
    },
    { // Diálogo 9
        speaker: "Airaak", 
        texto: "Hemos hecho todo lo posible por evitar su extinción, pero tememos que ya sea demasiado tarde.", 
        emotion: "normal",
        scene: "heleaDestruida",
        voice: "intro-voice6"  
    },
    { // Diálogo 10
        speaker: "Airaak", 
        texto: "{player}, no es casualidad que estés aquí. Te hemos observado y en seguida nos hemos dado cuenta de lo increíble que eres y del inmenso poder que posees.", 
        emotion: "normal",
        scene: "tornado",
        voice: "intro-voice7"  
    },
    { // Diálogo 11
        speaker: "Airaak",
        texts: {
            male: "Tu forma de cuidar a los demás, tu inteligencia y tu profunda capacidad de análisis y de introspección te hacen único. Nunca hemos conocido a un ser humano con una esencia tan pura.",
            female: "Tu forma de cuidar a los demás, tu inteligencia y tu profunda capacidad de análisis y de introspección te hacen única. Nunca hemos conocido a un ser humano con una esencia tan pura.",
            nobinary: "Tu forma de cuidar a los demás, tu inteligencia y tu profunda capacidad de análisis y de introspección te hacen excepcional. Nunca hemos conocido a un ser humano con una esencia tan pura."
        },  
        emotion: "normal",
        scene: "tornado",
        voice: "intro-voice8"  
    },
    { // Diálogo 12
        speaker: "Airaak", 
        texto: "Tienes que ayudarnos, eres nuestra última esperanza. No será nada fácil, pero podrás con ello. ¡Confiamos en ti!", 
        emotion: "normal",
        scene: "ventanaNave",
        voice: "intro-voice9"  
    },
    { // Diálogo 13
        speaker: "Airaak", 
        texto: "Qué me dices, ¿aceptas el reto?", 
        emotion: "normal",
        scene: "ventanaNave",
        voice: "intro-voice10"  
    },
    { // Diálogo 14
        scene: "ventanaNave"  
    }
];

const dialogosContinue = [

    { // Si el jugador elige "continuar"
        speaker: "Airaak",
        texts: {
            male: "Sabíamos que podíamos contar contigo, {player}. ¡Bienvenido a Helea!",
            female: "Sabíamos que podíamos contar contigo, {player}. ¡Bienvenida a Helea!",
            nobinary: "Sabíamos que podíamos contar contigo, {player}. ¡Bienvenide a Helea!"
        }, 
        emotion: "normal",
        scene: "entrandoHelea",
        voice: "intro-voice11"  
    }
];

const dialogosAbort = [

    { // Si el jugador elige "abortar"
        speaker: "Airaak", 
        texto: "Ya veo... Sentimos mucho oír eso, pero es comprensible. En tal caso, permítenos llevarte de vuelta a casa.", 
        emotion: "normal",
        scene: "estrellas",
        voice: "intro-voice12"  
    },
    { 
        speaker: "{player}",
        texto: ". . .", 
        emotion: "normal",
        scene: "fondoNegro" 
    },
    { 
        speaker: "{player}", 
        texto: "! ! !", 
        emotion: "worried",
        scene: "dormitorio" 
    },
    {  
        speaker: "Mamá", 
        texto: "{player}, ¿te has vuelto a dormir? ¡Llegarás tarde a la universidad!", 
        emotion: "normal",
        scene: "dormitorio" 
    },
    { 
        speaker: "{player}", 
        texto: "¿Cómo? Pero si...", 
        emotion: "confused",
        scene: "cama" 
    },
    { 
        speaker: "{player}", 
        texto: "¿Airaak... Helea...?", 
        emotion: "confused",
        scene: "ventanaDormitorio" 
    },
    { 
        speaker: "{player}", 
        texto: "(suspira)", 
        emotion: "normal",
        scene: "ventanaDormitorio" 
    }
];

const dialogosHeleaState10 = [

    { // Si el porcentaje es 10%
        speaker: "Kevin", 
        texto: "Últimas noticias de Helea, les habla Kevin en directo desde HeleaTV.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "El Gran Glaciar del Norte de Helea se ha derretido por completo. La temperatura en el planeta es de 47ºC y los Heleanos empiezan a sufrir quemaduras por la radiación.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Se anuncia un nuevo terremoto en el reino de Nublea. El suelo se ha agrietado por tercera vez en lo que llevamos de semana.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Más de 100 Heleanos heridos tras la inesperada erupción de varios volcanes en el Este de Helea, en la región de Orobor. La situación es insostenible.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "La vida en Helea no es nada fácil en estos momentos, pero los Heleanos confían en {player}, que parece ser la solución a todos sus problemas.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Esto es todo por ahora, les seguiremos informando de las últimas novedades.", 
        emotion: "normal",
    },
];

const dialogosHeleaState20 = [

    { // Si el porcentaje es 20%
        speaker: "Kevin", 
        texto: "Últimas noticias de Helea, les habla Kevin en directo desde HeleaTV.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Los ciudadanos de la Zona Vortex reportan lluvias ácidas de color violeta. Los expertos advierten del peligro de este líquido al contacto con las alas de los Heleanos.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Subida masiva del precio de la luz en todo el planeta debido al impacto de un meteorito sobre la central eléctrica de Silmar, una de las más importantes de Helea.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "El planeta parece que intenta resistir a su inevitable extinción, pero las condiciones de vida en Helea son cada vez más desfavorables.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Continúan las búsquedas de Helex en todo el territorio, pero las reservas son muy escasas. La desesperación de los Heleanos por encontrar este material es evidente.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Esto es todo por ahora, les seguiremos informando de las últimas novedades.", 
        emotion: "normal",
    },
];

const dialogosHeleaState30 = [

    { // Si el porcentaje es 30%
        speaker: "Kevin", 
        texto: "Últimas noticias de Helea, les habla Kevin en directo desde HeleaTV.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Hoy, por primera vez en décadas, se ha detectado una fluctuación magnética estable en Helea.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Las partículas de amoníaco y zinc que flotaban en el ambiente se han reducido considerablemente, aunque el aire que respiramos sigue siendo sucio y recargado.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "La temperatura atmosférica sigue en aumento, y es la fuente principal de preocupación de la población.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Las expediciones de búsqueda, lideradas por {player}, están siendo muy productivas y las reservas de Helex han ido creciendo exponencialmente.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Esto es todo por ahora, les seguiremos informando de las últimas novedades.", 
        emotion: "normal",
    },
];

const dialogosHeleaState40 = [

    { // Si el porcentaje es 40%
        speaker: "Kevin", 
        texto: "Últimas noticias de Helea, les habla Kevin en directo desde HeleaTV.", 
        emotion: "normal",
    },
    {
        speaker: "kevin", 
        texto: "Intensas tormentas tropicales azotan la zona del Valle de los Ecos. Muchos ciudadanos han tenido que abandonar sus casas y buscan asilo en ciudades próximas.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "La densa capa tóxica de la atmósfera de Helea comienza a fracturarse. En la Cordillera Punzante, se ha avistado un rayo de luz que duró más de tres minutos.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Pese a esta esperanzadora última noticia, el resto del planeta continúa inmerso en una abrumadora oscuridad.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Los niveles de oxígeno son bajos, pero eso no impide que los Heleanos salgan de sus casas y canten al unísono canciones de unidad y coraje.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Esto es todo por ahora, les seguiremos informando de las últimas novedades.", 
        emotion: "normal",
    },
];

const dialogosHeleaState50 = [

    { // Si el porcentaje es 50%
        speaker: "Kevin", 
        texto: "Últimas noticias de Helea, les habla Kevin en directo desde HeleaTV.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Los científicos han observado un mayor equilibrio termico en el planeta. Esto está permitiendo que el agua vuelva a su estado líquido.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Los Heleanos más pequeños ahora juegan y se zambullen en los lagos y ríos, acompañados por sus padres. ¡Se agradece ver luz entre tanta oscuridad!", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Los lechos de los ríos, secos durante años, vuelven a transportar sedimentos. La mayoría del agua no es potable aún, pero es un gran avance.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Las Aves Fénix, que se creían extintas, han vuelto a Helea. Aunque sólo las más resistentes pueden hacer vida aquí.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Esto es todo por ahora, les seguiremos informando de las últimas novedades.", 
        emotion: "normal",
    },
];

const dialogosHeleaState60 = [

    { // Si el porcentaje es 60%
        speaker: "Kevin", 
        texto: "Últimas noticias de Helea, les habla Kevin en directo desde HeleaTV.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Esta mañana se ha reportado el nacimiento de musgo bioluminiscente entre las grietas provocadas por los seísmos.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "La flora de Helea está mutando para adaptarse a la nueva atmósfera purificada. La temperatura en Helea es algo más soportable: 38ºC.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Los agricultores intentan volver a cosechar productos naturales, pero la tierra perdió todos sus nutrientes hace años y todavía no es fértil.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "El alimento más codiciado es el Apatch, una sopa nutritiva fácil de conseguir en los mercados.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Esto es todo por ahora, les seguiremos informando de las últimas novedades.", 
        emotion: "normal",
    },
];

const dialogosHeleaState70 = [

    { // Si el porcentaje es 70%
        speaker: "Kevin", 
        texto: "Últimas noticias de Helea, les habla Kevin en directo desde HeleaTV.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "¡Está lloviendo agua dulce! Los Heleanos están encantados, pues hasta ahora el agua que caía del cielo era ácida y tóxica.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Los sensores de temperatura del Instituto de Meteorología indican que la temperatura global se ha estabilizado en unos confortables 22ºC.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Se han organizado marchas y desfiles multitudinarios por todo Helea en apoyo a {player}, quien sin duda se está ganando el corazón de los Heleanos.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "La luz poco a poco va volviendo a Helea. La oscuridad que cubría todo el territorio como un manto demoníaco se ha ido disipando progresivamente.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Esto es todo por ahora, les seguiremos informando de las últimas novedades.", 
        emotion: "normal",
    },
];

const dialogosHeleaState80 = [

    { // Si el porcentaje es 80%
        speaker: "Kevin", 
        texto: "Últimas noticias de Helea, les habla Kevin en directo desde HeleaTV.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Helea está recobrando su color, y todo gracias a las constantes expediciones de {player}. El Sol vuelve a brillar en el cielo.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Los agricultores han conseguido completar sus primeras cosechas. ¡Los Heleanos podrán comer un buen plato caliente en sus casas!", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "La moral ha mejorado muchísimo en las últimas semanas. Al pasear por las calles de Helea, se observa un ambiente más positivo entre los vecinos.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Los crustáceos de Obsidiana, las medusas Translúcidas y los ciervos de Ámbar, entre muchas otras especies, han vuelto a avistarse por todo el planeta. ", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Esto es todo por ahora, les seguiremos informando de las últimas novedades.", 
        emotion: "normal",
    },
];

const dialogosHeleaState90 = [

    { // Si el porcentaje es 90%
        speaker: "Kevin", 
        texto: "Últimas noticias de Helea, les habla Kevin en directo desde HeleaTV.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "La resonancia del ya casi restaurado núcleo de Helea produce ahora una armonía audible en todo el planeta.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Los campos están en plena floración y el aire tiene un aroma dulce que ya nadie recordaba. Los ciudadanos informan de una sensación de paz profunda.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Con la temperatura estabilizada en 22ºC, el Valle de los Ecos se ha convertido en un mar de pétalos iridiscentes.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Tras décadas de ser un desierto de sal ácida, las aguas de Helea han recuperado su transparencia cristalina. La empresa Horizonte ha anunciado su primera ruta turística.", 
        emotion: "normal",
    },
    {
        speaker: "Kevin", 
        texto: "Esto es todo por ahora, les seguiremos informando de las últimas novedades.", 
        emotion: "normal",
    },
];

const dialogosHeleaState100 = [

    { // Si el porcentaje es 100%
        speaker: "Sora", 
        texto: "Últimas noticias de Helea, les habla Sora en directo desde HeleaTV.", 
        emotion: "normal",
    },
    {
        speaker: "Sora", 
        texto: "Disculpen a nuestro compañero Kevin, se ha ido a la playa a disfrutar del maravilloso Sol que brilla últimamente en el cielo de Helea.", 
        emotion: "normal",
    },
    {
        speaker: "Sora", 
        texto: "El núcleo está en perfecta simbiosis con cada ser vivo. Ya no existen zonas de exclusión ni niveles de toxicidad.", 
        emotion: "normal",
    },
    {
        speaker: "Sora", 
        texto: "La belleza y estabilidad del planeta son tan inmensas que su brillo es visible desde los sistemas solares vecinos.", 
        emotion: "normal",
    },
    {
        speaker: "Sora", 
        texto: "Helea ha pasado de ser una roca moribunda a ser el modelo de restauración ecológica para toda la galaxia.", 
        emotion: "normal",
    },
    {
        speaker: "Sora", 
        texto: "{player} llegó a nuestras vidas hace apenas unos meses, pero se ha convertido en un claro símbolo de Helea y en un ejemplo a seguir para toda la población.", 
        emotion: "normal",
    },
    {
        speaker: "Sora", 
        texto: "Gracias a su ayuda, hoy el planeta ya no solo sobrevive... Hoy Helea florece para siempre.", 
        emotion: "normal",
    },
    {
        speaker: "Sora", 
        texto: "¡GRACIAS! De parte de todos los Heleanos.", 
        emotion: "normal",
    },
];

// Introducción al Nivel 1

const dialogosNivel1 = [

    {
        speaker: "Gorko",
        texts: {
            male: "¿Una heleana en Musis? Y... ¡¿un humano?! ¿Qué hace un humano aquí?",
            female: "¿Una heleana en Musis? Y... ¡¿una humana?! ¿Qué hace una humana aquí?",
            nobinary: "¿Una heleana en Musis? Y... ¡¿un humane?! ¿Qué hace un humane aquí?"
        },  
        emotion: "normal",  
    },
    {
        speaker: "Airaak", 
        texto: "Sabes bien la situación de mi planeta y mi gente, Gorko. No estamos aquí por gusto.", 
        emotion: "normal",  
    },
    {
        speaker: "Gorko", 
        texto: "Grrrr...", 
        emotion: "normal",  
    },
    {
        speaker: "Airaak", 
        texto: "Necesitamos vuestras reservas de Helex. En cuanto las tengamos nos iremos y no os molestaremos más.", 
        emotion: "normal",  
    },
    {
        speaker: "Gorko", 
        texto: "¿Mis reservas de Helex? Estás loca si piensas que voy a darte tan preciado material así por así JAJAJAJA.", 
        emotion: "normal",  
    },
    {
        speaker: "Airaak", 
        texto: "Mmmm bueno, es bien sabido que sólo los elegidos pueden poseer piedras de Helex, ¿verdad?", 
        emotion: "normal",  
    },
    {
        speaker: "Gorko", 
        texto: "Así es.", 
        emotion: "normal",  
    },
    {
        speaker: "Airaak", 
        texto: "¿Y si {player} lo fuese? En ese caso podríamos llevarnos el Helex.", 
        emotion: "normal",  
    },
    {
        speaker: "Gorko",
        texts: {
            male: "¿El humano? ¿Un elegido? JAJAJAJA no me hagas reír.",
            female: "¿La humana? ¿Una elegida? JAJAJAJA no me hagas reír.",
            nobinary: "¿El humane? ¿Un elegide? JAJAJAJA no me hagas reír."
        },  
        emotion: "normal",  
    },
    {
        speaker: "Gorko", 
        texto: "Pero me puede la curiosidad, hacía mucho que no veía a alguien de la Tierra por aquí. Le daré la oportunidad de demostrar su valía.", 
        emotion: "normal",  
    },
    {
        speaker: "{player}", 
        texto: "¡Eso es!", 
        emotion: "happy",  
    },
    {
        speaker: "Gorko", 
        texto: "Eso sí, jugaremos con mis reglas. En Musis siempre es un buen momento para una...", 
        emotion: "normal",  
    },
    {
        speaker: "Gorko", 
        texto: "¡¡BATALLA DE RITMO!!", 
        emotion: "normal",  
    },
    {
        speaker: "{player}", 
        texto: "!!", 
        emotion: "worried",  
    },
];

// Introducción al Nivel 2

const dialogosNivel2 = [

    {
        speaker: "Airaak", 
        texto: "Nos aproximamos a Meow. Es un planeta vacío y deshabitado, pero en él se encuentra una de las mayores reservas de Helex de este Universo.", 
        emotion: "normal",
        scene: "meow1",  
    },
    {
        speaker: "Airaak", 
        texto: "¿La ves allá a lo lejos? Está fuertemente protegida por un escudo.", 
        emotion: "normal",
        scene: "meow1",  
    },
    {
        speaker: "Airaak", 
        texto: "El sistema de protección lo diseñaron los Killaen hace miles de años, pues antes éste planeta era muy hostil y siempre estaba en el punto de mira de cazarecompensas y sabandijas de todo tipo.", 
        emotion: "normal",
        scene: "meow1",  
    },
    {
        speaker: "{player}", 
        texto: "¿Y podremos llevarnos el Helex así sin más? ¿Cómo atravesaremos el escudo?", 
        emotion: "worried",
        scene: "meow1",  
    },
    {
        speaker: "Airaak", 
        texto: "No te preocupes, he hablado con la emperatriz de los Killaen y está al tanto de nuestra situación. Ha decidido ayudarnos y me ha dado las claves para acceder.", 
        emotion: "normal",
        scene: "meow1",  
    },
    {
        speaker: "Airaak", 
        texto: "Sólo tenemos que introducirlas en el terminal y coger el Helex. ¡Esto será coser y cantar!", 
        emotion: "normal",
        scene: "meow1",  
    },
    {
        speaker: "{player}", 
        texto: "Si tú lo dices...", 
        emotion: "normal",
        scene: "meow1",  
    },
    {
        speaker: "Airaak", 
        texto: "Pues claro. ¡Ya estamos llegando!", 
        emotion: "normal",
        scene: "meow1",  
    },
    {
        speaker: "{player}", 
        texto: "Espera, ¿eso son... GATOS?", 
        emotion: "confused",
        scene: "meow2",  
    },
    {
        speaker: "Airaak", 
        texto: "Animales del demonio, ¡eso es lo que son!", 
        emotion: "normal",
        scene: "meow2",  
    },
    {
        speaker: "{player}", 
        texto: "Pero qué dices, si no hacen nada.", 
        emotion: "happy",
        scene: "meow2",  
    },
    {
        speaker: "Airaak", 
        texto: "No te confundas, esos 'gatos' que conoces de la Tierra no tienen nada que ver con los 'baoo' de aquí. Son caprichosos, perezosos y odiosamente adorables.", 
        emotion: "normal",
        scene: "meow2",  
    },
    {
        speaker: "Airaak", 
        texto: "Y lo peor de todo: les encanta el Helex.", 
        emotion: "normal",
        scene: "meow2",  
    },
    {
        speaker: "{player}", 
        texto: "¡Están por todas partes! ¿Y ese gato gigante? Qué mal rollo.", 
        emotion: "worried",
        scene: "meow3",  
    },
    {
        speaker: "Baoo", 
        texto: "♪ ♪ ♪ ♫ ♫ ♩ ♫ ♩ ♫ ♪ ♪ ♪ ♩", 
        emotion: "normal",
        scene: "meow3",  
    },
    {
        speaker: "Airaak", 
        texto: "No vamos a poder llevarnos el Helex con estos Baoo por aquí. Encima no hablan nuestro idioma.", 
        emotion: "normal",
        scene: "meow3",  
    },
    {
        speaker: "{player}", 
        texto: "Na nana... ♪ ♪ na na na... ♪ ♫ ♫ nanana... ♪ ♪ ♩ ¡creo que lo pillo!", 
        emotion: "happy",
        scene: "meow3",  
    },
    {
        speaker: "Airaak",
        texts: {
            male: "¿Estás seguro de esto?",
            female: "¿Estás segura de esto?",
            nobinary: "¿Estás segure de esto?"
        },  
        emotion: "normal",
        scene: "meow3",  
    },
    {
        speaker: "{player}", 
        texto: "Sí, yo les distraigo mientras tú introduces el código en el panel. Gatitos... gatitos buenoos... fsssh fshh",
        emotion: "normal",
        scene: "meow3",  
    },
    {
        speaker: "Baoo", 
        texto: "¿ ♫ ♩ ♫ ♩ ?", 
        emotion: "normal",
        scene: "meow3",  
    }
];

// Introducción al Nivel 3

const dialogosNivel3 = [

    {
        speaker: "Airaak", 
        texto: "El siguiente destino es el caluroso planeta Sunder. Se compone en su totalidad de desiertos de arena tórrida, y las temperaturas no bajan de los 40 grados.", 
        emotion: "normal",
        scene: "sunder1",  
    },
    {
        speaker: "{player}", 
        texto: "¿En serio es necesario ir a estos sitios? ¿No hay un planeta llamado 'Chilling Place' o algo así?", 
        emotion: "surprised",
        scene: "sunder1",  
    },
    {
        speaker: "Airaak", 
        texto: "¿Chilling Place?", 
        emotion: "normal",
        scene: "sunder1",  
    },
    {
        speaker: "{player}",
        texto: "Sii, ya sabes: sofá y manta, capítulo de 'The Office', palomitas... ¿Algún planeta donde no nos puedan atacar gatos asesinos y que no se enfaden con nosotros por no bailar bien?", 
        emotion: "happy",
        scene: "sunder2",  
    },
    {
        speaker: "Airaak",
        texts: {
            male: "Ni idea de lo que estás hablando, humano. Pero si queremos evitar la extinción, tenemos que darnos prisa.",
            female: "Ni idea de lo que estás hablando, humana. Pero si queremos evitar la extinción, tenemos que darnos prisa.",
            nobinary: "Ni idea de lo que estás hablando, humane. Pero si queremos evitar la extinción, tenemos que darnos prisa."
        },  
        emotion: "normal",
        scene: "sunder3",  
    },
    {
        speaker: "{player}", 
        texto: "Está bien, vamos a ello.", 
        emotion: "normal",
        scene: "sunder3",  
    },
    {
        speaker: "Airaak", 
        texto: "La atmósfera de Sunder es muy densa y peligrosa. La presión aquí es tan elevada que destrozaría cualquier objeto o cuerpo cercano en menos de un minuto.", 
        emotion: "normal",
        scene: "sunder4",  
    },
    {
        speaker: "Airaak", 
        texto: "Nuestra nave no aguantará mucho, no va a ser fácil. Pero para conseguir el Helex tenemos que aterrizar en el planeta, así que no tenemos otra opción.", 
        emotion: "normal",
        scene: "sunder5",  
    },
    {
        speaker: "Airaak", 
        texts: {
            male: "Tenemos que ser muy rápidos y precisos, sólo así conseguiremos salir indemnes.",
            female: "Tenemos que ser muy rápidas y precisas, sólo así conseguiremos salir indemnes.",
            nobinary: "Tenemos que ser muy rápidos y precisos, sólo así conseguiremos salir indemnes."
        },  
        emotion: "normal",
        scene: "sunder5",  
    },
    {
        speaker: "Airaak", 
        texto: "Confío en tu habilidad para pilotar la X-7865. Sobrevuela el depósito de Helex, mantén la nave estable y yo me encargaré de recoger el Helex.", 
        emotion: "normal",
        scene: "sunder6",  
    },
    {
        speaker: "{player}", 
        texto: "¡Vamos allá!", 
        emotion: "happy",
        scene: "sunder6",  
    },
];

// Introducción al Nivel 4

const dialogosNivel4 = [

    {
        speaker: "{player}", 
        texto: "Qué quieres que te diga, no me da muy buena espina este sitio.", 
        emotion: "worried",
        scene: "underworld1",  
    },
    {
        speaker: "Airaak", 
        texto: "¿Lo dices por los cadáveres humanos o por el enorme Oktopo que vive en las profundidades de este planeta?.", 
        emotion: "normal",
        scene: "underworld1",  
    },
    {
        speaker: "{player}", 
        texto: "No sé cómo lo haces, pero siempre consigues bajarme los ánimos.", 
        emotion: "normal",
        scene: "underworld1",  
    },
    {
        speaker: "{player}", 
        texto: "¿Y dices que en un lugar como este hay reservas de Helex? ¿Estás segura? No parece muy acogedor, la verdad.", 
        emotion: "confused",
        scene: "underworld1",  
    },
    {
        speaker: "Airaak", 
        texto: "¡Precisamente por eso! Hay grandes cantidades de Helex porque nadie se atreve a venir por aquí. Y los pocos que vienen... pues no acaban muy bien.", 
        emotion: "normal",
        scene: "underworld1",  
    },
    {
        speaker: "{player}",
        texts: {
            male: "Y aquí estamos nosotros.",
            female: "Y aquí estamos nosotras.",
            nobinary: "Y aquí estamos nosotros."
        }, 
        emotion: "normal",
        scene: "underworld1",  
    },
    {
        speaker: "Airaak", 
        texto: "Exacto, todo sea por salvar Helea de su extinción. ¡Mira, ahí hay una barca! Tenemos que encontrar al Oktopo, él es quien tiene el tesoro.",
        emotion: "normal",
        scene: "underworld2",  
    },
    {
        speaker: "{player}", 
        texto: "Cada vez llueve más fuerte. No aguantaremos mucho si sigue entrando agua en la barca.",
        emotion: "worried",
        scene: "underworld3",
    },
    {
        speaker: "Airaak",
        texts: {
            male: "Estamos entrando en territorio del Gran Oktopo. No estamos solos. Será mejor que no mires esto, tú sigue remando.",
            female: "Estamos entrando en territorio del Gran Oktopo. No estamos solas. Será mejor que no mires esto, tú sigue remando.",
            nobinary: "Estamos entrando en territorio del Gran Oktopo. No estamos solos. Será mejor que no mires esto, tú sigue remando."
        }, 
        emotion: "normal",
        scene: "underworld4",
    },
    {
        speaker: "Airaak",
        texts: {
            male: "Los acechadores nocturnos y los vatts voladores viven en la superficie. Aquí corremos un grave peligro, humano. ¡Tenemos que saltar!",
            female: "Los acechadores nocturnos y los vatts voladores viven en la superficie. Aquí corremos un grave peligro, humana. ¡Tenemos que saltar!",
            nobinary: "Los acechadores nocturnos y los vatts voladores viven en la superficie. Aquí corremos un grave peligro, humane. ¡Tenemos que saltar!"
        },  
        emotion: "normal",
        scene: "underworld5",
    },
    {
        speaker: "Gran Oktopo",
        texts: {
            male: "¿Pero qué tenemos aquí? El elegido del que todo el mundo habla. Te imaginaba más viscoso, con un par más de corazones y algún que otro tentáculo.",
            female: "¿Pero qué tenemos aquí? La elegida de la que todo el mundo habla. Te imaginaba más viscosa, con un par más de corazones y algún que otro tentáculo.",
            nobinary: "¿Pero qué tenemos aquí? El elegide del que todo el mundo habla. Te imaginaba más viscose, con un par más de corazones y algún que otro tentáculo."
        },   
        emotion: "normal",
        scene: "underworld6",
    },
    {
        speaker: "Gran Oktopo", 
        texto: "Si hubieses venido en otro momento quizás te ofrecía té y unas pastas, pero me pillas con hambre. Con MUCHA hambre. Y la carne humana es tan... ¿humanística?",
        emotion: "normal",
        scene: "underworld6",
    },
    {
        speaker: "Airaak", 
        texto: "Basta de juegos, Oktopo. Necesitamos el Helex. Ya es hora de que alguien te pare los tentáculos y pagues por tus crímenes.",
        emotion: "normal",
        scene: "underworld6",
    },
    {
        speaker: "Gran Oktopo", 
        texto: "Aquí se acaba vuestro bonito viaje estelar. Espero que lo hayáis disfrutado. ¡Pringaos!",
        emotion: "normal",
        scene: "underworld7",
    },
    {
        speaker: "{player}", 
        texto: "¿Y ese insulto por la cara?",
        emotion: "confused",
        scene: "underworld7",
    },
    {
        speaker: "Airaak", 
        texto: "Haremos que se trague sus palabras.",
        emotion: "normal",
        scene: "underworld7",
    },
];

//------------------------------------------- UTILIDADES ---------

// Aparecer-desaparecer objetos del layout
// -------------------------------------------

function show(element) {
    element.classList.remove("invisible");
};

function hide(element) {
    element.classList.add("invisible");
}
//-----------------------

function hideUp(element) {
    element.classList.add("out-up");

    setTimeout(() => {
        element.classList.add("hidden");
    }, 800);
};

function hideUpSlow(element) {
    element.classList.add("out-up");

    setTimeout(() => {
        element.classList.add("hidden");
    }, 3000);
};
//-------------------------

function showUp(element) {
    element.classList.remove("hidden");

    requestAnimationFrame(() => {
        element.classList.remove("out-up");
    });
};

function showUpSlow(element) {
    element.style.opacity = 0;
    element.classList.remove("hidden");

    requestAnimationFrame(() => {
        element.classList.remove("out-up");
    });

    setTimeout(() => {
        element.style.opacity = 1;
    }, 200);
};
//-----------------------------

function hideCharacter(element) {
    element.classList.add("invisible");

    setTimeout(() => {
        element.classList.add("hidden");
    }, 300);
};

function showCharacter(element) {
    element.classList.remove("hidden");

    requestAnimationFrame(() => {
        element.classList.remove("invisible");
    });
};

//------------------------------------------- PRECARGA DE IMÁGENES ------

async function loadImage(src, retries = 3) {
    src = getNormalizedAsset(src);

    for (let attempt = 1; attempt <= retries; attempt++) {

        try {

            const img = new Image();

            img.decoding = "async";

            await new Promise((resolve, reject) => {

                img.onload = resolve;
                img.onerror = reject;

                img.src = src;
            });

            if (
                !img.complete ||
                img.naturalWidth === 0 ||
                img.naturalHeight === 0
            ) {
                throw new Error("Imagen incompleta");
            }

            try {
                await img.decode();
            } catch (e) {
                console.warn(
                    `Decode falló pero la imagen es válida: ${src}`
                );
            }

            AssetCache.images[src] = img;

            return img;

        } catch (error) {

            console.warn(
                `Reintentando imagen (${attempt}/${retries}): ${src}`
            );

            await new Promise(r => setTimeout(r, 500));
        }
    }

    throw new Error(
        `No se pudo cargar correctamente: ${src}`
    );
};

//------------------------------------------- PRECARGA DE VÍDEOS ---------

function loadVideo(src) {
    src = getNormalizedAsset(src);

    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.muted = true;
        video.src = src;

        const onLoaded = () => {
            cleanup();
            AssetCache.videos[src] = video;
            resolve(video);
        };

        const onError = () => {
            cleanup();
            reject(new Error(`Error al cargar vídeo: ${src}`));
        };

        const cleanup = () => {
            video.removeEventListener('canplaythrough', onLoaded);
            video.removeEventListener('loadeddata', onLoaded);
            video.removeEventListener('error', onError);
        };

        video.addEventListener('canplaythrough', onLoaded, { once: true });
        video.addEventListener('loadeddata', onLoaded, { once: true });
        video.addEventListener('error', onError, { once: true });
    });
};

function playVideo(element, src) {
    if (typeof src !== 'string' && src && src.src) {
        src = src.getAttribute('src');
    }

    if (!src) {
        console.error("playVideo: src inválido", src);
        return;
    }

    src = getNormalizedAsset(src);
    const cached = AssetCache.videos[src];

    if (cached) {
        element.src = cached.src;
    } else {
        console.warn("Vídeo no encontrado en caché, cargando normalmente:", src);
        element.src = src;
    }

    element.load();
    element.currentTime = 0;

    element.play().catch(e => console.error("Error al reproducir:", e));
}

//------------------------------------------- PRECARGA DE AUDIOS (POR MIGRAR) ------

// function loadAudio(src) {
//     return new Promise((resolve) => {

//         const audio = new Audio(src);
//         audio.preload = "auto";

//         audio.oncanplaythrough = () => {
//             AssetCache.audio[src] = audio;
//             resolve();
//         };

//         audio.onerror = () => resolve();
//     });
// };

//------------------------------------------- GESTOR DE AUDIO ---------

function configurarAudio() {
    menuMusic.volume = 0.5;
    menuMusic.volumeMax = 0.5;
    heleaStoryMusic.volume = 0.8;
    heleaStoryMusic.volumeMax = 0.8;
    openChestWaiting.volume = 0.5;
    openChestWaiting.volumeMax = 0.5;
    backgroundMusicIntro.volume = 0.6;
    backgroundMusicIntro.volumeMax = 0.6;
    gameOverMusicIntro.volume = 0.5;
    gameOverMusicIntro.volumeMax = 0.5;
    loadingLevelMusic.volume = 1;
    loadingLevelMusic.volumeMax = 1;
    musicIntroLevel1.volume = 0.5;
    musicIntroLevel1.volumeMax = 0.5;
    musicIntroLevel2.volume = 0.8;
    musicIntroLevel2.volumeMax = 0.8;
    musicIntroLevel3.volume = 1;
    musicIntroLevel3.volumeMax = 1;
    musicIntroLevel4.volume = 1;
    musicIntroLevel4.volumeMax = 1;
    musicLevel1.volume = 0.8;
    musicLevel1.volumeMax = 0.8;
    musicLevel3.volume = 0.6;
    musicLevel3.volumeMax = 0.6;
    musicLevel4.volume = 0.8;
    musicLevel4.volumeMax = 0.8;
    levelResumeMusic.volume = 1;
    levelResumeMusic.volumeMax = 1;
    creditsMusic.volume = 0.8;
    creditsMusic.volumeMax = 0.8;
    endGameCinematicMusic.volume = 0.8;
    endGameCinematicMusic.volumeMax = 0.8;

    monsterEffect1.volume = 1;
    monsterEffect2.volume = 1;
    monsterEffect3.volume = 1;
    monsterEffect4.volume = 1;
    crowdEffect.volume = 0.5;
    selectSound.volume = 1;
    selectSound2.volume = 1;
    selectSound3.volume = 1;
    typingSound.volume = 0.3;
    newRecordSound.volume = 0.9;
    newRecordVoiceSound.volume = 1;
    levelUnlockedEffect.volume = 1;
    correctAnswer.volume = 1;
    wrongAnswer.volume = 1;
    landingSound.volume = 1;
    errorLandingSound.volume = 1;
    newHintSound.volume = 1;
};

configurarAudio();

const AudioManager = {
    music: true, // Música activada
    sound: true, // Efectos activados
    currentMusic: null,

    // Reproducir música
    playMusic(music) {
        if (!this.music) return;
        if(this.currentMusic === music) return;

        if (this.currentMusic && this.currentMusic !== music) {
            // Si ya hay música, hacemos fade automáticamente
            this.fadeChangeMusic(music);
            return;
        }

        this.currentMusic = music;
        music.volume = music.volumeMax;
        music.currentTime = 0;
        music.loop = true;
        music.play().catch(() => {});
    },

    // Detener música
    stopMusic(music) {
        if (!music) return;
        music.pause();
        music.currentTime = 0;
        if (this.currentMusic === music) this.currentMusic = null;
    },

    // Cambiar música con fade
    fadeChangeMusic(newMusic, fadeDuration = 200) {
        if (!this.music) return;

        const oldMusic = this.currentMusic;
        const fadeSteps = 20; // más pasos = más suave
        const interval = fadeDuration / fadeSteps;
        let step = 0;
        const startVolume = oldMusic ? oldMusic.volume : 1;
        const targetVolume = newMusic.volumeMax || 1;

        newMusic.pause();

        // Fade-out
        const fadeOut = setInterval(() => {
            step++;
            if (oldMusic) oldMusic.volume = Math.max(startVolume * (1 - step / fadeSteps), 0);
            if (step >= fadeSteps) {
                clearInterval(fadeOut);
                if (oldMusic) this.stopMusic(oldMusic);

                // Fade-in nueva música
                newMusic.volume = 0;
                newMusic.currentTime = 0;
                newMusic.loop = true;
                newMusic.play().catch(() => {});
                this.currentMusic = newMusic;

                let fadeStep = 0;
                const fadeIn = setInterval(() => {
                    fadeStep++;
                    newMusic.volume = Math.min((fadeStep / fadeSteps) * targetVolume, targetVolume);
                    if (fadeStep >= fadeSteps) clearInterval(fadeIn);
                }, interval);
            }
        }, interval);
    },

    // Reproducir efecto de sonido
    playSound(sound) {
        if (!this.sound) return;
        sound.currentTime = 0;
        sound.play().catch(() => {});
    },

    stopSound(sound) {
        if (!sound) return;
        sound.pause();
        sound.currentTime = 0;
    },

    // Activar/desactivar música desde ajustes
    setMusic(enabled, music) {
        this.music = enabled;
        if (enabled && music) this.playMusic(music);
        else if (this.currentMusic) this.stopMusic(this.currentMusic);
    },

    // Activar/desactivar efectos desde ajustes
    setSound(enabled) {
        this.sound = enabled;
    }
};

//------------------------------------------- CÓDIGO Y GESTIÓN DEL JUEGO ---------

// LOADING SCREEN
// -------------------------------------------

gameVersionTxt.textContent = `Welcome to Helea ${gameVersion}`; // Aparece la versión del juego

async function loadGame(list, onComplete) {

    if (wasAssetsPreloaded()) {
        console.log("Assets ya precargados para la versión:", gameVersion);
    }

    realProgress = 0;
    visualProgress = 0;
    barraCarga.style.width = "0%";

    let elementsLoaded = 0;
    
    const validAssets = list.filter(asset =>
        !asset.match(/\.(mp3|wav|ogg|m4a)$/)
    );

    const totalElements = validAssets.length;

    let failedAssets = [];

    let numberMensaje;
    let lastMessage = -1;

    // Detectar bloqueos reales
    let lastProgressTime = Date.now();

    loadStartTime = performance.now();
    assetsFinished = false;
    loadingScreen = true;

    minTimer = null;
    changingMessage = null;

    loadingPage.classList.remove("invisible");

    function stopLoadingVisuals() {

        clearInterval(changingMessage);
        clearInterval(smoothLoader);
        clearInterval(stuckWatcher);
        clearTimeout(maxTimer);
    }

    function finishLoading() {

        if (loadingCompleted) return;

        loadingCompleted = true;

        stopLoadingVisuals();

        assetsFinished = true;

        if (failedAssets.length > 0) {

            mensajeCarga.style.color = "orange";

            mensajeCarga.textContent = `${failedAssets.length} recursos no pudieron cargarse`;
            txtAssetsCorrupted.textContent = `${failedAssets.length} recursos no se han cargado correctamente`;

            console.warn(
                "Assets fallidos:",
                failedAssets
            );

            retryOrContinue();

            return;

        } else {

            mensajeCarga.textContent =
                "Todo listo. Iniciando...";
            markAssetsPreloaded();
        }

        mensajeCargados.textContent = "";

        tryClose(onComplete);
    }

    smoothLoader = setInterval(() => {

        if (visualProgress < realProgress) {

            visualProgress += 0.5;

            barraCarga.style.width =
                visualProgress + "%";
        }

    }, 16);

    changingMessage = setInterval(() => {

        do {

            numberMensaje =
                Math.floor(
                    Math.random() *
                    loadingMessages.length
                );

        } while (numberMensaje === lastMessage);

        lastMessage = numberMensaje;

        mensajeCarga.textContent =
            loadingMessages[numberMensaje];

    }, 1500);

    const loaders = validAssets.map(async asset => {
        const assetPath = getNormalizedAsset(asset);

        try {

            let loader;

            // Carga de vídeos
            if (assetPath.endsWith(".mp4")) {

                loader = loadVideo(assetPath);

            // Carga de audios (desactivada)
            } else if (
                assetPath.match(/\.(mp3|wav|ogg|m4a)$/)
            ) {

                return;

            // Carga de imágenes
            } else {

                loader = loadImage(assetPath);
            }

            await loader;

        } catch (error) {

            console.error(
                `Error cargando asset: ${assetPath}`,
                error
            );

            failedAssets.push(assetPath);
        }

        elementsLoaded++;
        lastProgressTime = Date.now();

        mensajeCargados.textContent =
            `${elementsLoaded} de ${totalElements}`;

        updateLoader(
            elementsLoaded / totalElements
        );
    });

    await Promise.allSettled(loaders);

    finishLoading();
};

function retryOrContinue() {
    showUp(loadingDecision);
};

retryButton.onclick = async () => {
    hideUp(loadingDecision);
    loadingCompleted = false;

    location.reload();
};

continueButton.onclick = () => {
    hideUp(loadingDecision);
    tryClose(onComplete);
};

function tryClose(onComplete) {
    if(!loadingScreen || minTimer) return;

    if(gameState.newPlayer) {
        LOADER_MIN_TIME = 7000;
    }else {
        LOADER_MIN_TIME = 3000;
    }

    const elapsed = performance.now() - loadStartTime;
    const remaining = Math.max(LOADER_MIN_TIME - elapsed, 0);

    minTimer = setTimeout(() => {
        closeLoader(onComplete);
    }, remaining);
};

function closeLoader(onComplete) {
    if(!loadingScreen) return;

    clearTimeout(maxTimer);
    clearTimeout(minTimer);
    clearInterval(changingMessage);
    clearInterval(smoothLoader);
    clearInterval(stuckWatcher);

    document.querySelectorAll("img[data-src]").forEach(img => {
        const rawSrc = img.dataset.src;
        const src = getNormalizedAsset(rawSrc);
        const cached = AssetCache.images[src];

        if (cached) {
            img.src = cached.src;
            img.removeAttribute("data-src");
        } else {
            img.src = src;
            img.removeAttribute("data-src");
        }
    });

    minTimer = null;

    visualProgress = 100;
    barraCarga.style.width = "100%";
    hide(loadingPage);

    setTimeout(() => {
        loadingPage.style.display = "none";
    }, 1000);

    document.body.classList.add("ready");

    if(onComplete) onComplete();
};

// Actualizar estado de la carga
function updateLoader(progress) {
    realProgress = Math.min(progress * 100, 95);
};

const initialAssets = [...genericElements, ...mainMenuElements, ...Object.values(personAudios)];

const loadingBackground = new Image();

loadingBackground.src = "media/backgrounds/loading-screen.png";

loadingBackground.onload = () => {

    loadingPage.style.backgroundImage = `url(${loadingBackground.src})`;

    loadGame(initialAssets, () => { // Cargar los elementos iniciales cuando la imagen de carga esté lista
        setTimeout(() => {
            loadingScreen = false;
            console.log("Elementos iniciales listos y cargados");
            loadGameState();
            iniciarIntro();
        }, 1000);
    });
};


// INICIADORES
// -----------------------------------------------

function iniciarIntro() {
    cargarAjustes(); // Cargar ajustes guardados

    console.log("Música activa: ", AudioManager.music);
    console.log("Efectos de sonido activos: ", AudioManager.sound);

    dialogoIndex = 0;
    dialogosActivos = dialogosIntroBase;
    startingPage.classList.remove("invisible");
    showUpSlow(startingPage); // Iniciamos las instrucciones del juego
    instrucciones1 = true;
    avanzarDialogoIntro();
};

function iniciarMenuPrincipal() {
    game = true;

    // Actualizar personaje seleccionado
    switch (gameState.characterSelected) {
        case "male":
            imgCharacter.src = "/media/img/male-character/male_fullbody.png";
            characterLevelsUI.src = "/media/img/male-character/male_fullbody.png";
            greetingsGuide.textContent = "¡BIENVENIDO A HELEA!";
            break;

        case "female":
            imgCharacter.src = "/media/img/female-character/female_fullbody.png";
            characterLevelsUI.src = "/media/img/female-character/female_fullbody.png";
            greetingsGuide.textContent = "¡BIENVENIDA A HELEA!";
            break;

        case "nobinary":
            imgCharacter.src = "/media/img/non-binary-character/nobinary_fullbody.png";
            characterLevelsUI.src = "/media/img/non-binary-character/nobinary_fullbody.png";
            greetingsGuide.textContent = "¡BIENVENIDE A HELEA!";
            break;
    
        default:
            break;
    };

    gameVersionLogs.textContent = `v ${gameVersion}`; // Gestión y control de la versión del juego

    if (gameState.lastSeenVersion !== gameVersion) {
        gameState.newVersionNotif = true;
        gameState.lastSeenVersion = gameVersion;
        saveGameState();
    }

    updateLogsNotification();
    updateLastLogDot();

    showUp(menuPrincipal); // Iniciamos el juego.
    resetMenuPrincipal();

    AudioManager.fadeChangeMusic(menuMusic); // Suena la música del menú principal.

    if(setInitialGuide) { // Si el jugador es nuevo en el juego, se prepara la guía de inicio
        openInitialGuide();
        setInitialGuide = false;
    }

    if(gameState.freeModeAfterWinning) {
        setTimeout(() => {
            AudioManager.playSound(levelUnlockedEffect);

            alertbox.render({
                alertIcon: 'success',
                title: `Misión completada`,
                message: "¡Enhorabuena! Has completado el juego. Ahora puedes seguir jugando por libre a los niveles o empezar una nueva partida (menú ajustes).",
                btnTitle: 'Entendido',
                border: true
            });

            gameState.freeModeAfterWinning = false;
            saveGameState();
        }, 600);
    }
};

// INTRODUCCIÓN
// -----------------------------------------------

// Elegir personaje

characterOptions.forEach(character => {
    character.addEventListener("click", () => {
        if(!selectingCharacter) return;

        characterOptions.forEach(c => {
            c.classList.remove("selected");
        });

        character.classList.add("selected");
    });
});

selectCharacterBtn.addEventListener("click", () => {
    if(!selectingCharacter) return;

    const selectedOption = [...characterOptions].find(c => c.classList.contains("selected"));

    if(!selectedOption) return;

    const selectedCharacter = selectedOption.dataset.selectedCharacter;

    gameState.characterSelected = selectedCharacter; // Se guarda el personaje seleccionado

    switch (gameState.characterSelected) {
        case "male":
            selectedCharacterDecoration.src = "/media/img/male-character/male_normal.png";
            break;

        case "female":
            selectedCharacterDecoration.src = "/media/img/female-character/female_normal.png";
            break;

        case "nobinary":
            selectedCharacterDecoration.src = "/media/img/non-binary-character/nobinary_normal.png";
            break;
    
        default:
            break;
    };

    goToChooseName();
});

function goToChooseName() {
    hideUpSlow(selectCharacterBanner);
    selectingCharacter = false;
    selectingName = true;

    setTimeout(() => {
        showUpSlow(chooseNameBanner);
    }, 2000);
};

selectNameBtn.addEventListener("click", () => {
    if(!selectingName) return;

    const playerName = nameInput.value;

    // Validación del nombre
    if(playerName.trim().length < 2) {
        alert("Escribe un nombre más largo.");
        return;

    }else if(playerName.trim().length > 12) {
        alert("Escribe un nombre más corto.");
        return;
    };

    // Si es un nombre correcto, lo guardamos y continuamos
    gameState.nameCharacter = playerName;

    // Iniciamos los diálogos de la intro después de la configuración inicial
    hideUpSlow(chooseNameBanner);
    runningAnimation = false;

    setTimeout(() => {
        afterChoosingInitialOptions();
    }, 2000);
});

// Escribir los diálogos

let indexLetter = 0;
const velocidadLetter = 30; // A mayor número, más lenta la animación

function resolvePlayer(text) {
    return typeof text === "string"
        ? text.replace(/\{player\}/g, gameState.nameCharacter || "")
        : text;
};

function getDialogueText(dialogue) {

    if (dialogue.texts && typeof dialogue.texts === "object") {
        const gender = gameState.characterSelected || "male";
        return dialogue.texts[gender] || dialogue.texts.male || "";
    }
    
    if (dialogue.texto) {
        return dialogue.texto;
    }
    return "";
};

function escribirDialogo(texto, speaker, emotion, voice) {
    speaker = resolvePlayer(speaker);
    texto = resolvePlayer(texto);

    if(typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }

    // Protección: asegurar que `texto` no sea undefined para evitar errores en la función escribir()
    if (typeof texto === 'undefined' || texto === null) {
        console.warn('escribirDialogo: texto undefined en índice', dialogoIndex);
        texto = "";
    }

    escribiendo = true;
    indexLetter = 0;

    txtDialogue.textContent = "";
    dialogueTxtLevels.textContent = "";
    dialogueTxtHelea.textContent = "";

    voiceDialogue = document.getElementById(voice);

    setTimeout(() => {
        typingSound.loop = true;
        AudioManager.playSound(typingSound);

        if(voiceDialogue) {
            voiceDialogue.loop = false;
            AudioManager.playSound(voiceDialogue);
        }
    }, 300);
    

    // Poner nombre y color
    if(intro) {
        nameSpeaker.textContent = speaker;
    }else if(isPlayingLevel) {
        nameSpeakerLevels.textContent = speaker;
    }else if(openedHeleaState) {
        nameSpeakerHelea.textContent = speaker;
    }
    
    cambiarPersonaje(speaker, emotion);

    function cambiarPersonaje(speaker, emotion) {

        if(intro) {
            hideCharacter(characterMaleUI);
            hideCharacter(characterFemaleUI);
            hideCharacter(characterNobinaryUI);
            hideCharacter(characterAiraakUI);
            hideCharacter(characterMadreUI);
        }

        if(isPlayingLevel) {
            hideCharacter(characterMaleUILevels);
            hideCharacter(characterFemaleUILevels);
            hideCharacter(characterNobinaryUILevels);
            hideCharacter(characterGorkoUILevels);
            hideCharacter(characterAiraakUILevels);
            hideCharacter(characterBaooUILevels);
            hideCharacter(characterOktopoUILevels);        
        }

        if(openedHeleaState && news) {
            if(speaker === "Kevin") {
                characterSoraHelea.classList.add("hidden");
                characterKevinHelea.classList.remove("hidden");
                
            }else if(speaker === "Sora") {
                characterKevinHelea.classList.add("hidden");
                characterSoraHelea.classList.remove("hidden");
            }   
        }
        
        let characterToShow = null;

        if (gameState.characterSelected === "male" && speaker === gameState.nameCharacter) {

            if(intro) {
                nameSpeaker.style.color = "var(--terciario)";
                characterToShow = characterMaleUI;
            }else if(isPlayingLevel) {
                nameSpeakerLevels.style.color = "var(--terciario)";
                characterToShow = characterMaleUILevels;
            }

            if (emotion === "confused") { // Cambio de expresión facial según el diálogo actual
                characterMaleUI.src = "media/img/male-character/male_confused.png";
                characterMaleUILevels.src = "media/img/male-character/male_confused.png";
            } else if(emotion === "worried") {
                characterMaleUI.src = "media/img/male-character/male_worried.png";
                characterMaleUILevels.src = "media/img/male-character/male_worried.png";
            }else if(emotion === "happy") {
                characterMaleUI.src = "media/img/male-character/male_happy.png";
                characterMaleUILevels.src = "media/img/male-character/male_happy.png";
            } else {
                characterMaleUI.src = "media/img/male-character/male_normal.png";
                characterMaleUILevels.src = "media/img/male-character/male_normal.png";
            }

            if(emotion === "happy") { // Corregir tamaño del personaje de Lucía
                characterMaleUI.style.width = "130px";
                characterMaleUILevels.style.width = "130px";
            }else {
                characterMaleUI.style.width = "100px";
                characterMaleUILevels.width = "100px";
            }

        }else if(gameState.characterSelected === "female" && speaker === gameState.nameCharacter) {

            console.log("Todo correcto, entramos en el else");

            if(intro) {
                nameSpeaker.style.color = "var(--terciario)";
                characterToShow = characterFemaleUI;
            }else if(isPlayingLevel) {
                nameSpeakerLevels.style.color = "var(--terciario)";
                characterToShow = characterFemaleUILevels;
            }

            if (emotion === "confused") { // Cambio de expresión facial según el diálogo actual
                characterFemaleUI.src = "media/img/female-character/female_confused.png";
                characterFemaleUILevels.src = "media/img/female-character/female_confused.png";
            } else if(emotion === "worried") {
                characterFemaleUI.src = "media/img/female-character/female_worried.png";
                characterFemaleUILevels.src = "media/img/female-character/female_worried.png";
            }else if(emotion === "happy") {
                characterFemaleUI.src = "media/img/female-character/female_happy.png";
                characterFemaleUILevels.src = "media/img/female-character/female_happy.png";
            } else {
                characterFemaleUI.src = "media/img/female-character/female_normal.png";
                characterFemaleUILevels.src = "media/img/female-character/female_normal.png";
            }

        }else if(gameState.characterSelected === "nobinary" && speaker === gameState.nameCharacter) {

            if(intro) {
                nameSpeaker.style.color = "var(--terciario)";
                characterToShow = characterNobinaryUI;
            }else if(isPlayingLevel) {
                nameSpeakerLevels.style.color = "var(--terciario)";
                characterToShow = characterNobinaryUILevels;
            }

            if (emotion === "confused") { // Cambio de expresión facial según el diálogo actual
                characterNobinaryUI.src = "media/img/non-binary-character/nobinary_confused.png";
                characterNobinaryUILevels.src = "media/img/non-binary-character/nobinary_confused.png";
            } else if(emotion === "worried") {
                characterNobinaryUI.src = "media/img/non-binary-character/nobinary_worried.png";
                characterNobinaryUILevels.src = "media/img/non-binary-character/nobinary_worried.png";
            }else if(emotion === "happy") {
                characterNobinaryUI.src = "media/img/non-binary-character/nobinary_happy.png";
                characterNobinaryUILevels.src = "media/img/non-binary-character/nobinary_happy.png";
            } else {
                characterNobinaryUI.src = "media/img/non-binary-character/nobinary_normal.png";
                characterNobinaryUILevels.src = "media/img/non-binary-character/nobinary_normal.png";
            }

        }else if (speaker === "Airaak" || speaker === "???") {
            nameSpeaker.style.color = "var(--primario)";
            nameSpeakerLevels.style.color = "var(--primario)";
            nameSpeakerHelea.style.color = "var(--primario)";

            if(intro) {
                characterToShow = characterAiraakUI;
            }else if(isPlayingLevel) {
                characterToShow = characterAiraakUILevels;
            }else if(openedHeleaState) {
                characterToShow = null;
            }
            
            characterAiraakUI.src = "media/img/airaak.png";
            characterAiraakUILevels.src = "media/img/airaak.png";

        } else if (speaker === "Mamá") {
            nameSpeaker.style.color = "#fff";
            characterToShow = characterMadreUI;
            characterMadreUI.src = "media/img/madre.png";

        } else if (speaker === "Gorko") {
            nameSpeaker.style.color = "#fff";
            nameSpeakerLevels.style.color = "#fff";
            characterToShow = characterGorkoUILevels;
            characterGorkoUILevels.src = "media/img/gorko.png";

        } else if (speaker === "Kevin") {
            nameSpeakerHelea.style.color = "#4fe15e";
            characterToShow = characterKevinHelea;
            characterKevinHelea.src = "media/img/kevin.png";

        } else if (speaker === "Sora") {
            nameSpeakerHelea.style.color = "#c675d3";
            characterToShow = characterSoraHelea;
            characterSoraHelea.src = "media/img/sora.png";

        } else if(speaker === "Baoo") {
            nameSpeakerHelea.style.color = "#ff9046";
            characterToShow = characterBaooUILevels;
            characterBaooUILevels.src = "media/img/baoo.png";
            
        } else if(speaker === "Gran Oktopo") {
            nameSpeakerHelea.style.color = "#ff7575";
            characterToShow = characterOktopoUILevels;
            characterOktopoUILevels.src = "media/img/oktopo.png";
            
        } else {
            nameSpeaker.style.color = "#fff";
            nameSpeakerLevels.style.color = "#fff";
            nameSpeakerHelea.style.color = "#fff";
            characterToShow = null;
        }

        // Esperas SOLO para la animación de entrada
        setTimeout(() => {
            if (characterToShow) {
                showCharacter(characterToShow);
            }
        }, 300);
    }

    // Escribir los diálogos letra por letra
    function escribir() {

        if((indexLetter < texto.length) && escribiendo) {

            if(intro) {
                txtDialogue.textContent += texto.charAt(indexLetter);
            }else if(isPlayingLevel) {
                dialogueTxtLevels.textContent += texto.charAt(indexLetter);
            }else if(openedHeleaState) {
                dialogueTxtHelea.textContent += texto.charAt(indexLetter);
            }
            
            indexLetter++;
            typingTimeout = setTimeout(escribir, velocidadLetter);
        }else {
            escribiendo = false;
            AudioManager.stopSound(typingSound);
            dialogueIndicator.classList.add("show");
            dialogueIndicatorLevels.classList.add("show");
            dialogueIndicatorHelea.classList.add("show");
        };
    };

    typingTimeout = setTimeout(() => {
        escribir();
    }, 500);
};

// Cambio automático entre diálogos cuando se hace click en la pantalla
let dialogosActivos = dialogosIntroBase;

function avanzarDialogoIntro() {

    if (!intro) return;

    // 🔹 Si hemos llegado al punto de decisión y aún no se ha elegido
    if (dialogoIndex === dialogosIntroBase.length && !introChoiceDone) {
        setChoice();
        cambiarUI();
        return;
    }

    // 🔹 Si ya se eligió rama y aún no hemos extendido los diálogos
    if (introChoiceDone && branch && dialogosActivos.length === dialogosIntroBase.length) {

        if (branch === "continue") {
            dialogosActivos = [...dialogosIntroBase, ...dialogosContinue];
        }

        if (branch === "abort") {
            dialogosActivos = [...dialogosIntroBase, ...dialogosAbort];
        }
    }

    // 🔹 Si aún quedan diálogos por mostrar
    if (dialogoIndex <= dialogosActivos.length) {

        if(dialogoIndex < 1) dialogoIndex = 1;
        if(dialogoIndex > dialogosActivos.length) {
            console.warn("Índice de diálogo fuera de rango, ajustando: ", dialogoIndex);
            dialogoIndex = dialogosActivos.length;
        }

        const dialogoActual = dialogosActivos[dialogoIndex - 1];

        if(!dialogoActual) {
            console.error("Diálogo inexistente en índice ", dialogoIndex);
            introEnded = true;
            endIntro(branch);
            return;
        }

        cambiarUI();
        escribirDialogo(
            getDialogueText(dialogoActual),
            dialogoActual.speaker,
            dialogoActual.emotion,
            dialogoActual.voice
        );

        console.log("Diálogo actual: ", dialogoIndex);

        dialogoIndex++;
    } else {
        // 🔹 Si ya no quedan diálogos y hemos elegido continuar → termina la intro e inicia el juego
        introEnded = true;
        endIntro(branch);
    }
}

// Avanzar los diálogos de introducción a los niveles
function avanzarDialogoNivel() {
    if(!isPlayingLevel) return;

    if (dialogoIndex <= dialogosActivos.length) {

        if(dialogoIndex < 1) dialogoIndex = 1;
        if(dialogoIndex > dialogosActivos.length) {
            console.warn("Índice de diálogo fuera de rango, ajustando: ", dialogoIndex);
            dialogoIndex = dialogosActivos.length;
        }

        const dialogoActual = dialogosActivos[dialogoIndex - 1];

        if(!dialogoActual) {
            console.error("Diálogo inexistente en índice ", dialogoIndex);
            levelIntroEnded = true;
            endLevelIntro();
            return;
        }

        console.log("Diálogo Actual: ", dialogoActual);

        cambiarUI();
        escribirDialogo(
            getDialogueText(dialogoActual),
            dialogoActual.speaker,
            dialogoActual.emotion
        );

        console.log("Diálogo de nivel actual: ", dialogoIndex);

        dialogoIndex++;
    } else {
        // Si ya no quedan diálogos -> Se inicia el nivel
        levelIntroEnded = true;
        endLevelIntro();
    }
};

// Avanzar los diálogos de Noticias de Helea
function avanzarDialogoHelea() {
    if(!openedHeleaState) return;

    if (dialogoIndex <= dialogosActivos.length) {

        if(dialogoIndex < 1) dialogoIndex = 1;
        if(dialogoIndex > dialogosActivos.length) {
            console.warn("Índice de diálogo fuera de rango, ajustando: ", dialogoIndex);
            dialogoIndex = dialogosActivos.length;
        }

        const dialogoActual = dialogosActivos[dialogoIndex - 1];

        if(!dialogoActual) {
            console.error("Diálogo inexistente en índice ", dialogoIndex);
            dialogoIndex = 1;
        }

        console.log("Diálogo Actual: ", dialogoActual);

        escribirDialogo(
            getDialogueText(dialogoActual),
            dialogoActual.speaker,
            dialogoActual.emotion
        );

        console.log("Diálogo de nivel actual: ", dialogoIndex);

        dialogoIndex++;
    } else {
        
        closeNews(); // Si no quedan noticias, se cierra el panel informativo
    }
};

// Damos paso a la primera decisión (introducción inicial) --> El jugador puede CONTINUAR o ABORTAR.

function setChoice() {
    intro = false;
    chooseMode = true;
    hide(dialoguesBox);
    hideCharacter(characterAiraakUI);
    hideCharacter(characterMaleUI);
    hideCharacter(characterFemaleUI);
    hideCharacter(characterNobinaryUI);

    switch (gameState.characterSelected) {
        case "male":
            personajeAsomado.src = "/media/img/male-character/male_confused.png";
            choiceWakeup.textContent = "No estoy seguro...";
            break;

        case "female":
            personajeAsomado.src = "/media/img/female-character/female_confused.png";
            choiceWakeup.textContent = "No estoy segura...";
            break;

        case "nobinary":
            personajeAsomado.src = "/media/img/non-binary-character/nobinary_confused.png";
            choiceWakeup.textContent = "No estoy segure...";
            break;
    
        default:
            break;
    };

    setTimeout(() => {
        showUp(choiceBox); // Aparecen los botones de elección
    }, 400);
};

// Fin de los diálogos de la introducción

function endIntro(choice) {
    hide(startingPage);
    intro = false;
    console.log("Fin de la introducción");
    dialogoIndex = 1;

    backgroundScene.pause();
    backgroundScene.currentTime = 0;

    clearLightTimeouts();

    if (lightEffectsInterval) {
        clearInterval(lightEffectsInterval);
        lightEffectsInterval = null;
    };

    if(choice === "continue") {
        game = true;
    }else if(choice === "abort") {
        gameOver = true;
    }

    setTimeout(() => {
        startingPage.classList.add("hidden");

        if(choice === "continue") { // Si ha elegido CONTINUAR
            loadGameState();
            testEndGame(false);
            iniciarMenuPrincipal(); // Iniciamos el menú principal
            choice = null;
        }else if(choice === "abort") { // Si ha elegido ABORTAR
            setGameOver("abortGame"); // Vamos a la pantalla de Game Over. Especificamos la situación concreta: el jugador ha decidido abortar.
            choice = null;
        };
        
    }, 4000);
};


// ESCENAS DE LA INTRODUCCIÓN
// Cambiar los fondos de cada escena para una mayor inmersión
// -----------------------------------------------

// Resetear la escena primero

function resetEscenaIntro() {
    clearLightTimeouts();

    hide(naveEspacial);
    hide(heleaPlanet);
    hide(backgroundScene);

    startingPage.classList.remove(
        "background-interior-nave",
        "background-interior-nave-off",
        "background-interior-helea",
        "background-helea-destroyed",
        "background-ventana-nave",
        "background-exterior-helea",
        "background-black",
        "background-bedroom",
        "background-bed",
        "background-window"
    );

    btnAnteriorDialog.classList.remove("invisible");
    btnSkipDialog.classList.remove("invisible");
    naveEspacial.classList.remove("medium-view", "big-view");
    heleaPlanet.classList.remove("big-view");

    if(lightEffectsInterval) {
        clearInterval(lightEffectsInterval);
        lightEffectsInterval = null;
    }
};

function resetEscenaLevels() {
  
    level2Game.classList.remove("meow1");
    level2Game.classList.remove("meow2");
    level2Game.classList.remove("meow3");

    level3Game.classList.remove("sunder1");
    level3Game.classList.remove("sunder2");
    level3Game.classList.remove("sunder3");
    level3Game.classList.remove("sunder4");
    level3Game.classList.remove("sunder5");
    level3Game.classList.remove("sunder6");

    level4Game.classList.remove("underworld1");
    level4Game.classList.remove("underworld2");
    level4Game.classList.remove("underworld3");
    level4Game.classList.remove("underworld4");
    level4Game.classList.remove("underworld5");
    level4Game.classList.remove("underworld6");
    level4Game.classList.remove("underworld7");

    [level2Game, level3Game, level4Game].forEach(element => {
        element.style.display = "none";
        void element.offsetHeight;
        element.style.display = "";
    });
};

function resetHeaderLevels() {
    btnAnteriorDialogLevels.classList.remove("invisible");
    btnSkipDialogLevels.classList.remove("invisible");
};

// Cambiar los elementos UI según la escena

function cambiarUI() {

    if(!isPlayingLevel) {
        resetEscenaIntro();
        
    }else if(isPlayingLevel) {
        resetHeaderLevels();
        resetEscenaLevels();
    }
    
    const dialogoActual = dialogosActivos[dialogoIndex - 1];
    console.log("Diálogo actual: ", dialogoActual);
    if (!dialogoActual) return;

    switch(dialogoActual.scene) {

        case "nave":
            show(naveEspacial);
            show(backgroundScene);
        break;

        case "naveMediana":
            show(naveEspacial);
            show(backgroundScene);
            naveEspacial.classList.add("medium-view");
        break;

        case "naveGrande":
            clearLightTimeouts();
            show(backgroundScene);
            show(naveEspacial);
            naveEspacial.classList.add("big-view");
        break;

        case "interiorNave":
            startingPage.classList.add("background-interior-nave-off");
            lightEffectsInterval = setInterval(lightEffects, 5000);
        break;

        case "planetaHelea":
            clearLightTimeouts();
            show(backgroundScene);
            show(heleaPlanet);
            heleaPlanet.classList.add("big-view");
        break;

        case "interiorHelea":
            startingPage.classList.add("background-interior-helea");
        break;

        case "heleaDestruida":
            startingPage.classList.add("background-helea-destroyed");
        break;

        case "tornado":
            show(backgroundScene);
            backgroundScene.src = "media/videos/floating-space.mp4";
        break;

        case "ventanaNave":
            startingPage.classList.add("background-ventana-nave");
        break;

        case "entrandoHelea":
            startingPage.classList.add("background-exterior-helea");
            btnSkipDialog.classList.add("invisible");
            btnAnteriorDialog.classList.add("invisible");
            backgroundScene.classList.add("hidden");
            introEnded = true;
        break;

        case "estrellas":
            backgroundScene.src = "media/videos/fondo_estrellas.mp4";
            backgroundScene.classList.remove("hidden");
            show(backgroundScene);
        break;

        case "fondoNegro":
            startingPage.classList.add("background-black");
        break;

        case "dormitorio":
            startingPage.classList.add("background-bedroom");
        break;

        case "cama":
            startingPage.classList.add("background-bed");
        break;

        case "ventanaDormitorio":
            startingPage.classList.add("background-window");
            introEnded = true;
        break;

        case "meow1":
            level2Game.classList.add("meow1");
        break;

        case "meow2":
            level2Game.classList.add("meow2");
        break;

        case "meow3":
            level2Game.classList.add("meow3");
        break;

        case "sunder1":
            level3Game.classList.add("sunder1");
        break;

        case "sunder2":
            level3Game.classList.add("sunder2");
        break;

        case "sunder3":
            level3Game.classList.add("sunder3");
        break;

        case "sunder4":
            level3Game.classList.add("sunder4");
        break;

        case "sunder5":
            level3Game.classList.add("sunder5");
        break;

        case "sunder6":
            level3Game.classList.add("sunder6");
        break;

        case "underworld1":
            level4Game.classList.add("underworld1");
        break;

        case "underworld2":
            level4Game.classList.add("underworld2");
        break;

        case "underworld3":
            level4Game.classList.add("underworld3");
        break;

        case "underworld4":
            level4Game.classList.add("underworld4");
        break;

        case "underworld5":
            level4Game.classList.add("underworld5");
        break;

        case "underworld6":
            level4Game.classList.add("underworld6");
        break;

        case "underworld7":
            level4Game.classList.add("underworld7");
        break;
    };

    // Excepciones de las escenas (evitar errores manualmente)

    if(dialogoIndex === 1) {
        if(isPlayingLevel) {
            btnAnteriorDialogLevels.classList.add("invisible");
        }else {
            btnAnteriorDialog.classList.add("invisible");
        }
    }

    if(!isPlayingLevel && dialogoIndex === 4) {
        clearLightTimeouts();
    }

    if(!isPlayingLevel && dialogoIndex === 5) {
        lightEffects();
    }

    if(!isPlayingLevel && dialogoIndex === 7) {
        clearLightTimeouts();
    }

    if(!isPlayingLevel && dialogoIndex === 8) {
        backgroundScene.src = "media/videos/fondo_estrellas.mp4";
    }

    if(!isPlayingLevel && !introChoiceDone && dialogoIndex === dialogosIntroBase.length) { // Decisión de continuar o abortar
        btnSkipDialog.classList.add("invisible");
        startingPage.classList.add("background-ventana-nave");
    }

    if(!isPlayingLevel && branch === "continue" && dialogoIndex === dialogosIntroBase.length + dialogosContinue.length) { // Si eliges continuar y acaban los diálogos
        btnSkipDialog.classList.add("invisible");
        btnAnteriorDialog.classList.add("invisible");
        introEnded = true;
    }

    if(!isPlayingLevel && branch === "abort" && dialogoIndex === dialogosIntroBase.length + dialogosAbort.length) { // Si eliges abortar y acaban los diálogos
        btnSkipDialog.classList.add("invisible");
        introEnded = true;
    }

    if(!isPlayingLevel && branch === "abort" && dialogoIndex === dialogosIntroBase.length + 1) { // Si eliges abortar
        btnAnteriorDialog.classList.add("invisible");
    }
};

// Animación de las luces de la nave

function lightEffects() {
    clearLightTimeouts();

    lightTimeouts.push(setTimeout(() => {
        startingPage.classList.remove("background-interior-nave");
        startingPage.classList.add("background-interior-nave-off");
    }, 500));

    lightTimeouts.push(setTimeout(() => {
        startingPage.classList.remove("background-interior-nave-off");
        startingPage.classList.add("background-interior-nave");
    }, 700));

    lightTimeouts.push(setTimeout(() => {
        startingPage.classList.remove("background-interior-nave");
        startingPage.classList.add("background-interior-nave-off");
    }, 900));

    lightTimeouts.push(setTimeout(() => {
        startingPage.classList.remove("background-interior-nave-off");
        startingPage.classList.add("background-interior-nave");
    }, 1100));
};

// Cancelar animación de luces de la nave

function clearLightTimeouts() {
    lightTimeouts.forEach(id => clearTimeout(id));
    lightTimeouts = [];
};


// GESTIÓN DE CLICKS EN LA PANTALLA
// -----------------------------------------------

window.addEventListener("click", () => { // Cuando se haga click en la pantalla

    if(escribiendo || runningAnimation || loadingScreen || hiddenDialogues || chooseMode) return;

    if(instrucciones1) {
        hideUpSlow(startBanner1);
        hideUpSlow(headerInstrucciones);
        runningAnimation = true;

        setTimeout(() => {
            showUpSlow(startBanner2);
            headerInstruccionesTxt.textContent = "Una producción de L&M";
            showUpSlow(headerInstrucciones);
            runningAnimation = false;
            instrucciones1 = false;
            instrucciones2 = true;
        }, 3000);
        return;
    };

    if(instrucciones2) {

        hideUpSlow(startBanner2);
        hideUpSlow(headerInstrucciones);
        runningAnimation = true;

        if(!gameState.newPlayer) { // Si NO es la primera vez que el jugador inicia el juego, salta directamente al menú principal
            instrucciones2 = false;
            runningAnimation = false;
            introEnded = true;
            endIntro("continue");
            return;
        }

        setTimeout(() => {
            showUpSlow(selectCharacterBanner);
            runningAnimation = false;
            instrucciones2 = false;
            selectingCharacter = true;
        }, 3000);
    };

    if(intro) {
        dialogueIndicator.classList.remove("show");
        AudioManager.stopSound(voiceDialogue);
        avanzarDialogoIntro();
        return;
    };

    if(openedInitialGuide) {
        dialogueIndicatorGuide.classList.remove("show");
        changeInstructionsGuide();
        return;
    };

    if(isPlayingLevel && !levelIntroEnded) {
        dialogueIndicator.classList.remove("show");
        avanzarDialogoNivel();
        return;
    };

    if(openedHeleaState && news) {
        dialogueIndicator.classList.remove("show");
        avanzarDialogoHelea();
        return;
    };

    if(openedHeleaStoryPage) {
        AudioManager.playSound(selectSound3);
        nextStoryStep();
    }
});

function afterChoosingInitialOptions() {
    gameState.newPlayer = false; // La próxima vez que se inicie el juego, saltará directamente al menú principal
    setInitialGuide = true; // Aparecerá la guía inicial al acceder al menú principal
    saveGameState();

    AudioManager.playMusic(backgroundMusicIntro); // Iniciar la música de la introducción

    setTimeout(() => {
        console.log("Sistema de diálogos activo: Introducción.");
        cambiarUI();
        showUpSlow(dialoguesBox);
        showUpSlow(headerDialogues);
        avanzarDialogoIntro(); // avanza al primer diálogo   
        runningAnimation = false;
    }, 3000);

    selectingName = false; // Dejamos atrás la configuración inicial para pasar a la intro
    intro = true;
    return;
};

// Choice de la introducción --> Elegir CONTINUAR o ABORTAR

choiceGo.addEventListener("click", () => { // Continuar

    AudioManager.playSound(selectSound);

    hide(choiceBox);

    setTimeout(() => {
        chooseMode = false;
        intro = true;
        introChoiceDone = true;
        branch = "continue";

        // Avanzamos al primer diálogo de la rama
        dialogoIndex = dialogosIntroBase.length + 1;

        dialogueIndicator.classList.remove("show");
        show(dialoguesBox);
        choiceBox.classList.add("hidden");

        avanzarDialogoIntro();

    }, 300);
});

choiceWakeup.addEventListener("click", () => { // Abortar misión

    AudioManager.playSound(selectSound);

    hide(choiceBox);

    setTimeout(() => {
        chooseMode = false;
        intro = true;
        introChoiceDone = true;
        branch = "abort";

        // Avanzamos al primer diálogo de la rama
        dialogoIndex = dialogosIntroBase.length + 1;

        dialogueIndicator.classList.remove("show");
        show(dialoguesBox);
        choiceBox.classList.add("hidden");
        
        avanzarDialogoIntro();
    }, 300);
});

// Volver al anterior diálogo

btnAnteriorDialog.addEventListener("click", (e) => {

    e.stopPropagation();

    if(dialogoIndex <= 1 || hiddenDialogues) return;

    AudioManager.playSound(selectSound);
    AudioManager.stopSound(voiceDialogue);

    // Si estamos tomando una decisión

    if(chooseMode) { 
        hideUp(choiceBox);

        setTimeout(() => {
            show(dialoguesBox);
        }, 300);
        
        chooseMode = false;
        intro = true;
        dialogoIndex -= 1;

    }else { // Si no estamos tomando decisiones
        escribiendo = false;

        if(typingTimeout) {
            clearTimeout(typingTimeout);
            typingTimeout = null;
        }

        dialogoIndex -= 2;
    };
    
    dialogueIndicator.classList.remove("show");
    btnAnteriorDialog.classList.add("active");
    cambiarUI();
    avanzarDialogoIntro();

    setTimeout(() => {
        btnAnteriorDialog.classList.remove("active");
    }, 600);
});

// Volver al anterior diálogo (en niveles)

btnAnteriorDialogLevels.addEventListener("click", (e) => {

    e.stopPropagation();

    if(dialogoIndex <= 1 || hiddenDialogues) return;

    AudioManager.playSound(selectSound);

    escribiendo = false;

    if(typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }

    dialogoIndex -= 2;

    dialogueIndicatorLevels.classList.remove("show");
    btnAnteriorDialogLevels.classList.add("active");
    cambiarUI();
    avanzarDialogoNivel();

    setTimeout(() => {
        btnAnteriorDialogLevels.classList.remove("active");
    }, 600);
});

// Ocultar diálogos

btnOcultarDialogos.addEventListener("click", (e) => {

    e.stopPropagation();

    AudioManager.playSound(selectSound);

    hiddenDialogues = btnOcultarDialogos.classList.toggle("closed-eye");

    if(chooseMode) { // cuando el jugador está eligiendo una opción
        choiceBox.classList.toggle("invisible", hiddenDialogues);
    }else{
        dialoguesBox.classList.toggle("invisible", hiddenDialogues);
    };
    
    btnOcultarDialogos.src = hiddenDialogues ? "media/icons/icon-eye-closed.png" : "media/icons/icon-eye.png";
});

// Ocultar diálogos (en niveles)

btnOcultarDialogosLevels.addEventListener("click", (e) => {

    e.stopPropagation();

    AudioManager.playSound(selectSound);

    hiddenDialogues = btnOcultarDialogosLevels.classList.toggle("closed-eye");

    dialoguesBoxLevels.classList.toggle("invisible", hiddenDialogues);
    
    btnOcultarDialogosLevels.src = hiddenDialogues ? "media/icons/icon-eye-closed.png" : "media/icons/icon-eye.png";
});

// Saltar diálogos

btnSkipDialog.addEventListener("click", (e) => {

    e.stopPropagation();

    if(!intro) return; // Sólo funciona si estamos en la introducción

    AudioManager.playSound(selectSound);
    AudioManager.stopSound(voiceDialogue);
    AudioManager.stopSound(typingSound);

    escribiendo = false;


    if(typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }

    console.log("La rama activa antes de skipear es: ", branch);

    if(branch === "continue") {
        dialogoIndex = dialogosIntroBase.length + dialogosContinue.length;
    }else if(branch === "abort") {
        endIntro(branch);
    }else {
        dialogoIndex = dialogosIntroBase.length;
    };

    dialogueIndicator.classList.remove("show");
    btnSkipDialog.classList.add("active");
    avanzarDialogoIntro();
    cambiarUI();

    setTimeout(() => {
        btnSkipDialog.classList.remove("active");
    }, 600);
});

// Saltar diálogos - en niveles

btnSkipDialogLevels.addEventListener("click", (e) => {

    e.stopPropagation();

    if(!isPlayingLevel) return; // Sólo funciona si estamos jugando a un nivel

    AudioManager.playSound(selectSound);

    escribiendo = false;

    AudioManager.stopSound(typingSound);

    if(typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }

    endLevelIntro();

    dialogueIndicatorLevels.classList.remove("show");
    btnSkipDialogLevels.classList.add("active");

    setTimeout(() => {
        btnSkipDialogLevels.classList.remove("active");
    }, 600);
});


// GAME OVER
// -----------------------------------------------

function setGameOver(situation) {

    AudioManager.fadeChangeMusic(gameOverMusicIntro);
    showUp(gameOverPage);

    // Situaciones de Game Over

    if(situation === "abortGame") {
        iconOver.src = "/media/img/teddy-bear.png";
        gameOverPage.style.backgroundImage = "url('/media/backgrounds/game-over-dark.png')";
        gameOverPage.style.backgroundPosition = "left center";
        mensajeFeedback.textContent = "Decidiste que era mejor abandonar, parecía peligroso. Te autoconvences de que hiciste lo correcto. Pero algo te dice que podrías haber sido de mucha ayuda, y no puedes dejar de pensar en Airaak y en el resto de los heleanos. Te apena no haberlo intentado al menos."
        endGameTitle.style.color = "#ffd191";
    };

    if(situation === "level1") {
        iconOver.src = "/media/img/disco-ball.png";
        gameOverPage.style.backgroundImage = "url('/media/backgrounds/game-over-level1.png')";
        gameOverPage.style.backgroundPosition = "center center";
        mensajeFeedback.textContent = "La batalla de ritmo fue intensa. Grok está decepcionado, y ha decidido no compartir el Helex contigo. La hostilidad de los Rockots te sorpende, pero el ritmo y el baile parece ser algo sagrado para estas criaturas.";
        endGameTitle.style.color = "#f9a59b";
    };

    if(situation === "level2") {
        iconOver.src = "/media/img/headphones.png";
        gameOverPage.style.backgroundImage = "url('/media/backgrounds/game-over-level2.png')";
        gameOverPage.style.backgroundPosition = "center center";
        mensajeFeedback.textContent = "Los Baoo os pillaron por sorpresa. Intentaste comunicarte con ellos, pero su lenguaje era complejo y fascinante al mismo tiempo. ¿Cómo podían imitar tan bien a Chiara? Sigues flipando cada vez que lo piensas.";
        endGameTitle.style.color = "#cd5151";
    };

    if(situation === "level3") {
        iconOver.src = "/media/img/red-button.png";
        gameOverPage.style.backgroundImage = "url('/media/backgrounds/game-over-level3.png')";
        gameOverPage.style.backgroundPosition = "center center";
        mensajeFeedback.textContent = "Fue terrible. El casco de la nave no aguantó la enorme presión atmosférica del planeta Sunder y se descompuso en mil pedazos. Ya no queda nada de vuestro vehículo. Abres los ojos y todo es oscuridad, parece que flotaréis sin rumbo por el espacio durante los próximos 6000 años.";
        endGameTitle.style.color = "#f7dc5a";
    };

    if(situation === "level4") {
        iconOver.src = "/media/img/coffee-cup.png";
        gameOverPage.style.backgroundImage = "url('/media/backgrounds/game-over-level4.png')";
        gameOverPage.style.backgroundPosition = "center center";
        mensajeFeedback.textContent = "El Gran Oktopo era mucho más astuto de lo que os habíais imaginado. Os hipnotizó fácilmente con sus acertijos y caísteis en su trampa. ¿Realmente sabe bien la carne humana? Un tentáculo te rodea la pierna. El pulpo está a punto de descubrirlo.";
        endGameTitle.style.color = "#BD6ED9";
    };
};

btnGoIntro.addEventListener("click", () => { // Redirección a la introducción
    gameOver = false;
    game = true;
    AudioManager.playSound(selectSound);

    hideUp(gameOverPage);

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
    
});

btnGoMain.addEventListener("click", () => { // Redirección al menú principal
    gameOver = false;
    game = true;
    AudioManager.playSound(selectSound);

    hideUp(gameOverPage);

    setTimeout(() => {
        AudioManager.fadeChangeMusic(menuMusic);
        loadGameState(); // Cargar datos guardados antes
        resetMenuPrincipal();
        iniciarMenuPrincipal();
    }, 1000);
    
});


// MENÚ PRINCIPAL
// -----------------------------------------------

// Guía de inicio (sólo para nuevos jugadores)

function openInitialGuide() {
    openedInitialGuide = true;

    initialGuide.classList.remove("hidden");

    setTimeout(() => {
        show(initialGuide); // Aparece el overlay oscuro

        guideElements.forEach(element => {
            element.classList.add("semi-invisible");
        });

        mainMenuBlocks.forEach(block => {
            block.classList.add("overpass-layers");
        });

        btnJugar.classList.add("overpass-layers-playbutton");

        show(characterAiraakGuide);

        changeInstructionsGuide();
    }, 500);
};

function closeInitialGuide() {
    guideProgress = 0;

    guideElements.forEach(element => {
        element.classList.remove("semi-invisible", "active-in-guide");
    });

    mainMenuBlocks.forEach(block => {
        block.classList.remove("overpass-layers");
    });

    btnJugar.classList.remove("overpass-layers-playbutton");
    initialGuide.classList.add("hidden");

    openedInitialGuide = false;
};

function changeInstructionsGuide() {
    guideProgress++;

    if(guideProgress > initialGuideTxts.length) {
        closeInitialGuide();
        return;
    }

    instructionsGuide.innerHTML = initialGuideTxts[guideProgress-1];

    guideElements.forEach(element => {
        element.classList.remove("active-in-guide");
        element.classList.add("semi-invisible");
    })

    switch (guideProgress) {
        case 1:
            btnStory.classList.add("active-in-guide");
            btnStory.classList.remove("semi-invisible");
            instructionsGuideContainer.style.justifyContent = "flex-end";
            instructionsGuide.style.textAlign = "right";
            break;

        case 2:
            btnHeleaState.classList.add("active-in-guide");
            btnHeleaState.classList.remove("semi-invisible");
            instructionsGuideContainer.style.justifyContent = "flex-end";
            instructionsGuide.style.textAlign = "right";
            break;

        case 3:
            btnAjustes.classList.add("active-in-guide");
            btnAjustes.classList.remove("semi-invisible");
            instructionsGuideContainer.style.justifyContent = "flex-start";
            instructionsGuide.style.textAlign = "left";
            break;

        case 4:
            btnJugar.classList.remove("semi-invisible");
            btnJugar.classList.add("active-in-guide");
            instructionsGuideContainer.style.justifyContent = "center";
            instructionsGuide.style.textAlign = "center";
            characterAiraakGuide.classList.add("hidden");
            instructionsGuide.style.marginBottom = "100px";
            initialGuide.style.justifyContent = "space-between";
            break;
    
        default:
            break;
    }

    show(instructionsGuide);
    dialogueIndicatorGuide.classList.add("show");
};


// Iniciar juego (PLAY)

btnJugar.addEventListener("click", () => {

    if(openedInitialGuide) return;

    AudioManager.playSound(selectSound2);

    iconoAjustes.src = "media/icons/icon-back.png";

    openedNiveles = true;

    if(openedNiveles) { // Abrir el menú de niveles

        levelsMenu.style.overflowY = "auto";
        playLevelButton.classList.add("out-screen");

        inOutElements.forEach(element => { // Desaparecen los elementos innecesarios
            hideUp(element);
        });

        hide(characterMain);
        textoFooter.classList.add("hidden");
        mainHeader.classList.add("reduct-margintop");

        // Se actualizan los niveles --> ¿Están desbloqueados o bloqueados?
        updateLevelsState();

        if(gameState.newLevelUnlocked) {
            setTimeout(() => {
                AudioManager.playSound(levelUnlockedEffect);

                alertbox.render({
                    alertIcon: 'info',
                    title: `Nivel desbloqueado`,
                    message: `¡Ya puedes jugar al nivel ${gameState.nivelActual}!`,
                    btnTitle: 'Ir al mapa',
                    border: true
                });

                const alertBtn = document.querySelector(".alert-btn");
                if (alertBtn && !loadingScreen) {
                    alertBtn.addEventListener("click", () => {
                        openLevelsMap();
                    });
                }
            }, 600);

            gameState.newLevelUnlocked = false;
            saveGameState();
            return;

        }else {
            openLevelsMap(); // Abrir mapa de niveles
        }
    };
});

function openLevelsMap() {

    setTimeout(() => {
        showUp(levelsMenu);
        showUp(menuPrincipal);
        levelsMenu.style.scrollBehavior = "auto";
        levelsMenu.scrollTop = 0;
    }, 1000);

    setTimeout(() => {
        subtituloPrincipal.textContent = "Mapa de";
        tituloPrincipal.textContent = "Niveles";
        characterMain.classList.remove("invisible");
        characterMain.classList.add("blocked");
        characterMain.classList.add("hidden");
        showUp(btnAjustes);
        showUp(btnAllRecords);
        showUp(mainHeader);
        showUp(moonLevelsUI);
        levelsMenu.classList.add("opened");
        levelsMenu.style.scrollBehavior = "smooth";
    }, 1050);  
    
    setTimeout(() => {
        imgCharacter.classList.remove("hidden");
        levelsMenu.scrollTop = levelsMenu.scrollHeight;
    }, 1500);
};

// Actualizar el estado de cada nivel (récords, color, estilo, estado, planeta...)
function updateLevelsState() {
    
    planetsLevelsContainers.forEach(level => {
        const levelId = Number(level.dataset.level);
        const completado = gameState.nivelesCompletos.includes(levelId);
        let esActual = levelId === gameState.nivelActual;
        const enConstruccion = level.classList.contains("building-level");

        if (esActual && enConstruccion) { // Si el nivel actual está todavía en construcción, no se desbloquea
            esActual = false;
        }

        const recordTxt = level.querySelector(".record-level-txt");
        const maxRecord = getBestRecord(levelId);

        if(maxRecord.score <= 0) {
            recordTxt.textContent = "Sin récord";
            maxRecord.difficult = "norecord";
        }else {
            recordTxt.textContent = `Récord: ${maxRecord.score} (${maxRecord.difficult})`;
        }
        
        switch (maxRecord.difficult) {
            case "fácil":
                recordTxt.style.color = "greenyellow";
                break;

            case "normal":
                recordTxt.style.color = "yellow";
                break;

            case "difícil":
                recordTxt.style.color = "red";
                break;

            case "norecord":
                recordTxt.style.color = "#fff";
                break;
        
            default:
                break;
        }

        level.classList.remove(
            "locked",
            "active",
            "completed"
        );

        const planetTitle = level.querySelector("h3");

        if(completado) {
            level.classList.add("completed");
            planetTitle.textContent = planetTitle.dataset.original;
        }else if(esActual) {
            level.classList.add("active");
            planetTitle.textContent = planetTitle.dataset.original;
        }else {
            level.classList.add("locked");

            if(planetTitle) {
                if(enConstruccion) {
                    planetTitle.textContent = "Próximamente";
                }else {
                    planetTitle.textContent = "Bloqueado";
                }
            }
        };
    });
};

// Abrir página de logs (actualizaciones del juego)

btnLogs.addEventListener("click", () => {

    if(openedInitialGuide) return;

    openedLogs = true;
    AudioManager.playSound(selectSound2);

    hideUp(mainHeader);

    inOutElements.forEach(element => { // Desaparecen los elementos innecesarios
        hideUp(element);
    });

    imgCharacter.classList.add("hidden");
    textoFooter.classList.add("hidden");
    characterMain.classList.add("hidden");

    updateLastLogDot();

    if(gameState.newVersionNotif) {
        gameState.newVersionNotif = false; // Eliminamos la notificación de nueva actualización
        saveGameState();
    }

    setTimeout(() => {
        showUp(logsMenu);
        updateLogsNotification();
    }, 1000);
});

function updateLogsNotification() {

    if (gameState.newVersionNotif) {
        logsNotifDot.style.display = "block";
    } else {
        logsNotifDot.style.display = "none";
    }
};

function updateLastLogDot() {

    if (!lastUpdateDot) return;

    if (gameState.newVersionNotif) {
        lastUpdateDot.style.display = "block";
    } else {
        lastUpdateDot.style.display = "none";
    }
};

// Cerrar página de logs (actualizaciones del juego)

btnCloseLogs.addEventListener("click", () => {

    if(openedLogs) {

        openedLogs = false;
        AudioManager.playSound(selectSound);
        hideUp(logsMenu);

        setTimeout(() => {
            tituloPrincipal.textContent = "Welcome to Helea";
            subtituloPrincipal.textContent = "Una aventura espacial";
            mainHeader.classList.remove("reduct-margintop");
        }, 500);

        setTimeout(() => {
            showUp(mainHeader);

            inOutElements.forEach(element => { // Aparecen los elementos del menú principal
                showUp(element);
            });

            imgCharacter.classList.remove("hidden");
            textoFooter.classList.remove("hidden");
            characterMain.classList.remove("hidden");
        }, 1000);
    }
});

// Abrir página de Historia de Helea

btnStory.addEventListener("click", () => {

    if(openedInitialGuide) return;

    openedStoryMenu = true;
    AudioManager.playSound(selectSound2);

    hideUp(mainHeader);

    inOutElements.forEach(element => { // Desaparecen los elementos innecesarios
        hideUp(element);
    });

    imgCharacter.classList.add("hidden");
    textoFooter.classList.add("hidden");
    characterMain.classList.add("hidden");

    setTimeout(() => {
        tituloPrincipal.textContent = "Modo Historia";
        subtituloPrincipal.textContent = "Sobre Helea";
        mainHeader.classList.add("reduct-margintop");
    }, 500);

    setTimeout(() => {
        showUp(storyMenu);
        showUp(mainHeader);
    }, 1000);

    setTimeout(() => {
        btnCloseStory.classList.remove("invisible");
        btnCloseStory.classList.remove("go-down"); // El botón de cerrar se desplaza hacia abajo
    }, 1200);
});

// Cerrar página de Historia de Helea

btnCloseStory.addEventListener("click", () => { 

    if(openedStoryMenu) {

        openedStoryMenu = false;
        AudioManager.playSound(selectSound);

        btnCloseStory.classList.add("go-down");
        btnCloseStory.classList.add("invisible");
        hideUp(mainHeader);
        hideUp(storyMenu);

        setTimeout(() => {
            tituloPrincipal.textContent = "Welcome to Helea";
            subtituloPrincipal.textContent = "Una aventura espacial";
            mainHeader.classList.remove("reduct-margintop");
        }, 500);

        setTimeout(() => {
            showUp(mainHeader);

            inOutElements.forEach(element => { // Aparecen los elementos del menú principal
                showUp(element);
            });

            imgCharacter.classList.remove("hidden");
            textoFooter.classList.remove("hidden");
            characterMain.classList.remove("hidden");
        }, 1000);
    }
});

// Volver a ver la introducción del juego

btnPrimerContacto.addEventListener("click", () => {

    if(openedStoryMenu) { // Si el menú del Modo Historia está abierto
        btnPrimerContacto.classList.add("selected");
        AudioManager.stopMusic(menuMusic);
        AudioManager.playSound(selectSound2);
        openedStoryMenu = false;
        btnCloseStory.classList.add("go-down");
        btnCloseStory.classList.add("invisible");
        hide(btnArchivosHelea);
        hideUp(mainHeader);
        
        setTimeout(() => {
            gameState.newPlayer = true; // Indicamos que el jugador quiere volver a ver la intro
            saveGameState();
            location.reload();
        }, 2000);
    }
});

// Historia de Helea

btnArchivosHelea.addEventListener("click", () => {

    if(openedStoryMenu) { // Si el menú del Modo Historia está abierto
        btnArchivosHelea.classList.add("selected");
        AudioManager.stopMusic(menuMusic);
        AudioManager.playSound(selectSound2);

        openedStoryMenu = false;

        btnCloseStory.classList.add("go-down", "invisible");
        hide(btnPrimerContacto);
        hideUp(mainHeader);

        setTimeout(() => {
            hideUp(btnPrimerContacto);
            hide(storyMenuContainer);
        }, 1000);

        setTimeout(() => {
            storyMenuContainer.classList.add("hidden");
            prepareHeleaStory();
        }, 2000);
    }
});

let loadingStoryInterval = null;

async function prepareHeleaStory() {
    const MIN_LOADING_TIME = 4000;
    const startTime = performance.now();    

    showUp(storyLoadingPage);
    startLoadingStory();
    
    try {
        await loadStoryAssets(heleaStoryElements);

        const endTime = performance.now();
        const timeElapsed = endTime - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - timeElapsed);
    
        setTimeout(() => {
            // --- TRANSFERENCIA DE CACHÉ A HTML ---
            const storyContainer = document.getElementById("story-menu");
            if (storyContainer) {
                storyContainer.querySelectorAll("img[data-src]").forEach(img => {
                    const rawSrc = img.dataset.src;
                    const src = getNormalizedAsset(rawSrc);
                    const cached = AssetCache.images[src];
                    if (cached) {
                        img.src = cached.src;
                    } else {
                        img.src = src;
                    }
                    img.removeAttribute("data-src");
                });
            }

            clearInterval(loadingStoryInterval);
            setHeleaStory();
        }, remainingTime);

    } catch (error) {
        console.error("Error crítico cargando la historia:", error);
    }
}

function startLoadingStory() {

    let txtPosition = 0;

    AudioManager.playMusic(heleaStoryMusic);

    if (loadingStoryInterval) clearInterval(loadingStoryInterval);

    loadingStoryInterval = setInterval(() => {

        const dots = ".".repeat(txtPosition);
        loadingStoryText.textContent = "Cargando" + dots;

        txtPosition = (txtPosition + 1) % 4;
    }, 300);
};

async function loadStoryAssets(list) {
    if (list.length === 0) return Promise.resolve();

    const loaders = list.map(asset => {
        const assetPath = getNormalizedAsset(asset);
        if (assetPath.endsWith(".mp4")) {
            return loadVideo(assetPath);
        } else if (assetPath.match(/\.(mp3|wav|ogg|m4a)$/)) {
            return Promise.resolve(); 
        } else {
            return loadImage(assetPath);
        }
    });

    return Promise.all(loaders);
}

function setHeleaStory() {
    openedHeleaStoryPage = true;

    hide(storyLoadingPage);

    if (loadingStoryInterval) {
        clearInterval(loadingStoryInterval);
        loadingStoryInterval = null;
    }

    setTimeout(() => {
        heleaStoryPage.classList.remove("hidden");
    }, 1000);

    storySteps.forEach(e => {
        const isActive = e.classList.contains("active");

        if(!isActive) {
            e.classList.add("hidden");
        }else {
            e.classList.remove("hidden");
        }
    });

    setTimeout(() => {
        storyLoadingPage.classList.remove("invisible");
        storyLoadingPage.classList.add("hidden");
        heleaStoryPage.classList.remove("invisible");
    }, 2000);
};

function nextStoryStep() {
    if(openedHeleaStoryPage && storyStepCount < storySteps.length) {
        storySteps.forEach(step => {
            step.classList.add("hidden");
        })

        storySteps[storyStepCount].classList.remove("hidden");

        storyStepCount++;

    }else if(openedHeleaStoryPage && storyStepCount >= storySteps.length) {
        closeStoryPage();

        setTimeout(() => {
            resetStoryMenu();
            resetMenuPrincipal();
            iniciarMenuPrincipal();
        }, 1000);
    }
};

function closeStoryPage() {
    storyStepCount = 1;
    openedHeleaStoryPage = false;

    hide(heleaStoryPage);
    hide(storyMenu);

    setTimeout(() => {
        heleaStoryPage.classList.add("hidden");
        storyMenu.classList.remove("invisible");
        storyMenu.classList.add("out-up", "hidden");
    }, 1000);
};

function resetStoryMenu() {
    btnArchivosHelea.classList.remove("selected");
    AudioManager.playSound(selectSound);

    btnCloseStory.classList.add("go-down", "invisible");
    btnPrimerContacto.classList.remove("hidden", "invisible", "out-up");
    storyMenuContainer.classList.remove("hidden", "invisible");
    show(btnPrimerContacto);
};

// Abrir menú de estado global de Helea

const percentTxt = document.querySelector("#porcentaje-completado");

btnHeleaState.addEventListener("click", () => {

    if(openedInitialGuide) return;

    const currentScore = gameState.playerScore;
    const actualHelex = Math.min((currentScore / helexGoal) * 100, 100);
    const actualHelexFixed = Math.floor(actualHelex);

    openedHeleaState = true;

    if(openedHeleaState) {

        AudioManager.playSound(selectSound2);

        hideUp(mainHeader);

        inOutElements.forEach(element => { // Desaparecen los elementos innecesarios
            hideUp(element);
        });

        imgCharacter.classList.add("hidden");
        textoFooter.classList.add("hidden");
        characterMain.classList.add("hidden");

        setTimeout(() => {
            tituloPrincipal.textContent = "Estado de Helea";
            subtituloPrincipal.textContent = "Tu progreso";
            mainHeader.classList.add("reduct-margintop");
        }, 500);

        percentTxt.textContent = "0%";

        if(actualHelexFixed >= 0 && actualHelexFixed < 10) {
            dialogosActivos = dialogosHeleaState10;
        }else if(actualHelexFixed >= 10 && actualHelexFixed < 20) {
            dialogosActivos = dialogosHeleaState20;
        }else if(actualHelexFixed >= 20 && actualHelexFixed < 30) {
            dialogosActivos = dialogosHeleaState30;
        }else if(actualHelexFixed >= 30 && actualHelexFixed < 40) {
            dialogosActivos = dialogosHeleaState40;
        }else if(actualHelexFixed >= 40 && actualHelexFixed < 50) {
            dialogosActivos = dialogosHeleaState50;
        }else if(actualHelexFixed >= 50 && actualHelexFixed < 60) {
            dialogosActivos = dialogosHeleaState60;
        }else if(actualHelexFixed >= 60 && actualHelexFixed < 70) {
            dialogosActivos = dialogosHeleaState70;
        }else if(actualHelexFixed >= 70 && actualHelexFixed < 80) {
            dialogosActivos = dialogosHeleaState80;
        }else if(actualHelexFixed >= 80 && actualHelexFixed < 90) {
            dialogosActivos = dialogosHeleaState90;
        }else if(actualHelexFixed >= 90 && actualHelexFixed <= 100) {
            dialogosActivos = dialogosHeleaState100;
        }
        
        setTimeout(() => {
            showUp(heleaPlanetPage);
            showUp(mainHeader);
            updateHelexInfo();
        }, 1000);
    };
});

// Abrir Noticias de Helea

btnNews.addEventListener("click", () => {

    news = true;

    if(news) {
        AudioManager.playSound(selectSound2);
        hideUp(mainHeader);

        hideWhenNewsElements.forEach(element => {
            hide(element);
        });

        setTimeout(() => {
            tituloPrincipal.textContent = "Helea TV";
            subtituloPrincipal.textContent = "En directo";
            
            hideWhenNewsElements.forEach(element => {
                element.classList.add("hidden");
                element.classList.remove("invisible");
            });

        }, 500);

        setTimeout(() => {
            showUp(mainHeader);
            showUp(dialoguesBoxHelea);
            dialogoIndex = 1;
            avanzarDialogoHelea(); // Comienzan las noticias actualizadas de Helea
        }, 1000);
    }
});

// Cerrar página de Estado de Helea

btnCloseState.addEventListener("click", () => {
    
    openedHeleaState = false;
    news = false;
    AudioManager.playSound(selectSound);

    hideUp(heleaPlanetPage);
    hideUp(mainHeader);

    setTimeout(() => {
        tituloPrincipal.textContent = "Welcome to Helea";
        subtituloPrincipal.textContent = "Una aventura espacial";
        mainHeader.classList.remove("reduct-margintop");
    }, 500);

    setTimeout(() => {

        inOutElements.forEach(element => { // Aparecen los elementos necesarios
            showUp(element);
        });

        showUp(imgCharacter);
        showUp(textoFooter);
        showUp(characterMain);
        showUp(mainHeader);

    }, 1000);
});

// Cerrar Noticias de Helea --> Se cierran automáticamente si no quedan más noticias

function closeNews() {
    if(news) {
        AudioManager.playSound(selectSound);
        hideUp(mainHeader);
        hide(dialoguesBoxHelea);
        dialogoIndex = 1;

        setTimeout(() => {
            tituloPrincipal.textContent = "Estado de Helea";
            subtituloPrincipal.textContent = "Tu progreso";
        }, 500);

        setTimeout(() => {
            showUp(mainHeader);

            dialoguesBoxHelea.classList.remove("invisible");
            dialoguesBoxHelea.classList.add("hidden");

            hideWhenNewsElements.forEach(element => {
                showUp(element);
            });
        }, 1000);

        news = false;
    }
};

function updateHelexInfo() { // Actualizar la barra de estado de Helea

    let initialCount = 0;
    const currentScore = gameState.playerScore;
    const actualHelex = Math.min((currentScore / helexGoal) * 100, 100);
    const actualHelexFixed = Math.floor(actualHelex);
    const countDuration = 2000;
    const steps = actualHelexFixed;
    const timeInterval = actualHelexFixed > 0 ? countDuration / actualHelexFixed : 0;

    const progressBar = document.querySelector("#helex-actual-bar2");
    
    // Actualizamos la apariencia visual del planeta Helea
    if(actualHelexFixed < 25) { 
        planetHeleaState.src = "/media/img/helea-state1.png";
    }else if(actualHelexFixed > 25 && actualHelexFixed < 50) {
        planetHeleaState.src = "/media/img/helea-state2.png";
    }else if(actualHelexFixed > 50 && actualHelexFixed < 75) {
        planetHeleaState.src = "/media/img/helea-state3.png";
    }else if(actualHelexFixed > 75 && actualHelexFixed <= 100) {
        planetHeleaState.src = "/media/img/helea-state4.png";
    }

    // Iniciamos la animación del porcentaje de juego completado
    if(actualHelexFixed > 0) {
        const counter = setInterval(() => {
            initialCount++;
            percentTxt.textContent = initialCount + "%";

            if(initialCount >= actualHelexFixed) {
                clearInterval(counter);
            }
        }, timeInterval);

    }else {
        percentTxt.textContent = "0%"; // Porcentaje de juego completado
    }

    totalPointsTxt.textContent = `${currentScore} hx.`;
    objectivePoints.textContent = `Objetivo: ${helexGoal} hx.`;
    progressBar.style.setProperty('--target-width', actualHelexFixed + "%");
};

function updateFinalLevelBar() {
    
    const progressBar = document.querySelector(".helex-actual-bar");
    if (!progressBar) return; 

    let initialCount = 0;
    let currentScore = gameState.playerScore;
    let actualHelex = Math.min((currentScore / helexGoal) * 100, 100);
    let actualHelexFixed = Math.floor(actualHelex);
    
    const countDuration = 2000;
    let timeInterval = actualHelexFixed > 0 ? countDuration / actualHelexFixed : 0;

    // 2. Estado inicial de la barra
    progressBar.style.setProperty('--target-height', actualHelexFixed + "%");
    progressBar.style.height = actualHelexFixed + "%";

   
    const runCounter = (target) => {
        if (target <= initialCount) return;
        
        const counter = setInterval(() => {
            initialCount++;
            percentTxtFinalLevel.textContent = initialCount + "%";

            if (initialCount >= target) {
                clearInterval(counter);
            }
        }, countDuration / (target - initialCount || 1)); 
    };

    
    if (actualHelexFixed > 0) {
        runCounter(actualHelexFixed);
    } else {
        percentTxtFinalLevel.textContent = "0%";
    }

    
    let puntuacionFinal = 0;

    if (playingLevel === 1) {
        puntuacionFinal = level1State.score;
    }else if(playingLevel === 2) {
        puntuacionFinal = level2State.score;
    }else if(playingLevel === 3) {
        puntuacionFinal = level3State.score;
    }else if(playingLevel === 4) {
        puntuacionFinal = level4State.score;
    }

    if (!tryRecord || !tryRecord.newRecord) return;
    console.log("La puntuación final del nivel es: ", puntuacionFinal);
    
    setTimeout(() => {

        if(puntuacionFinal > tryRecord.actualRecord) {
            const newPoints = puntuacionFinal - tryRecord.actualRecord;
            gameState.playerScore += newPoints; // Se suma la diferencia de puntos

            let newHelex = Math.min((gameState.playerScore / helexGoal) * 100, 100);
            let newHelexFixed = Math.floor(newHelex);

            progressBar.style.setProperty('--target-height', newHelexFixed + "%");
            progressBar.style.height = newHelexFixed + "%";

            runCounter(newHelexFixed);
        }
    }, 3000);
}

// Abrir-cerrar menú de ajustes

btnAjustes.addEventListener("click", (e) => {

    if(openedInitialGuide) return;

    e.stopPropagation();

    if(!openedAjustes && !openedNiveles && !openedLevelInstructions) { // abrir el menú de ajustes

        AudioManager.playSound(selectSound2);

        settingItemGolevels.classList.add("hidden");

        openedAjustes = true;

        mainHeader.classList.add("reduct-margintop");

        // Cargamos los ajustes de manera visual
        toggleMusic.checked = AudioManager.music;
        toggleSound.checked = AudioManager.sound;

        inOutElements.forEach(element => { // Desaparecen los elementos innecesarios
            hideUp(element);
        });

        textoFooter.classList.add("hidden");

        characterMain.classList.add("go-down");

        setTimeout(() => {
            iconoAjustes.src = "media/icons/icon-back.png";
            subtituloPrincipal.textContent = "Menú de";
            tituloPrincipal.textContent = "Ajustes";
            showUp(mainHeader);
            showUp(btnAjustes);
            showUp(menuAjustes);
        }, 1000);

    }else if(openedAjustes && !openedWarning) { // cerrar el menú de ajustes

        AudioManager.playSound(selectSound);

        openedAjustes = false;

        mainHeader.classList.remove("reduct-margintop");

        btnAjustes.querySelector("img").src = "media/icons/icono-config.png";
        hideUp(mainHeader);
        hideUp(btnAjustes);
        hideUp(menuAjustes);

        characterMain.classList.remove("go-down");

        setTimeout(() => {
            inOutElements.forEach(element => {
                subtituloPrincipal.textContent = "Una aventura espacial";
                tituloPrincipal.textContent = "Welcome to Helea";
                showUp(element);
            });

            textoFooter.classList.remove("hidden");
        }, 800);

    }else if(!openedAllRecords && openedNiveles && !openedAjustes && !selectedLevel && !openedLevelInstructions) { // cerrar el menú de niveles

        AudioManager.playSound(selectSound);

        openedNiveles = false;

        hideUp(btnAllRecords);
        hideUp(mainHeader);
        hideUp(btnAjustes);
        hide(levelsMenu);
        mainHeader.classList.remove("reduct-margintop");
        
        moon.style.opacity = 1;

        setTimeout(() => {
            iconoAjustes.src = "media/icons/icono-config.png";
            levelsMenu.classList.remove("opened");
        }, 750);

        setTimeout(() => { // Aparecen todos los elementos del menú principal
            inOutElements.forEach(element => {
                subtituloPrincipal.textContent = "Una aventura espacial";
                tituloPrincipal.textContent = "Welcome to Helea";
                showUp(element);
            });

            showUp(btnAjustes);
            showUp(characterMain);
            characterMain.classList.remove("blocked");
            imgCharacter.classList.remove("hidden");
            textoFooter.classList.remove("hidden");
            show(levelsMenu);
            levelsMenu.classList.add("hidden");
        }, 800);

    }else if(!openedAllRecords && openedNiveles && !openedAjustes && selectedLevel && !openedLevelInstructions && !selectingDifficult) { // Cerrar el menú de nivel seleccionado

        AudioManager.playSound(selectSound);
        levelsMenu.style.overflowY = "auto";

        selectedLevel = false;

        planetSelectedImg.classList.forEach(cls => {  // Quitar las clases innecesarias
            if (cls.startsWith("planet-level")) {
                planetSelectedImg.classList.remove(cls);
            }
        });

        levelSelectedUI.classList.forEach(cls => {  // Quitar las clases innecesarias
            if (cls.startsWith("planet-level-container")) {
                levelSelectedUI.classList.remove(cls);
            }
        });

        hide(levelSelectedUI);

        mainHeader.querySelector("h3").style.color = "var(--secundario)";
        
        setTimeout(() => {
            showUp(selectLevels);
            showUp(moonLevelsUI);
            showUp(btnAllRecords);
            levelSelectedUI.classList.add("hidden");
            levelSelectedUI.classList.remove("invisible");
            mainMenuRight.classList.remove("go-bottom");
        }, 1000);

        setTimeout(() => {
            levelsMenu.scrollTop = levelsMenu.scrollHeight;
        }, 1200);

    }else if(!openedAllRecords && openedNiveles && !openedAjustes && selectedLevel && !openedLevelInstructions && selectingDifficult) { // Cerrar selección de dificultad
     
        selectingDifficult = false;

        difficultButtons.forEach(btn => {
            btn.classList.remove("active");
        })

        levelSelectedUI.classList.remove("flow");
        playLevelButton.classList.add("out-screen");

        setTimeout(() => {
            hide(levelSelectDifficult);
        }, 500);

        setTimeout(() => {
            levelSelectDifficult.classList.remove("invisible");
            levelSelectDifficult.classList.add("hidden");
            showUp(levelSelectedButtons);
        }, 800);

    }else if(!openedAllRecords && !openedNiveles && openedLevelInstructions && selectedLevel) { // Cerrar menú de instrucciones de niveles

        AudioManager.playSound(selectSound);
        
        openedLevelInstructions = false;
        openedNiveles = true;

        hideUp(instructionsPage);
        hideUp(mainHeader);

        setTimeout(() => {
            show(levelSelectedUI);
            subtituloPrincipal.textContent = "Mapa de";
            tituloPrincipal.textContent = "Niveles";
            mainHeader.classList.remove("instructions-mode");
            showUp(mainHeader);
        }, 800);

    }else if(openedAllRecords && !openedAjustes && !selectedLevel && !openedLevelInstructions && !selectingDifficult) { // Cerrar menú de todos los récords

        openedAllRecords = false;
        AudioManager.playSound(selectSound);
        levelsMenu.style.overflowY = "auto";
        levelsMenu.style.scrollBehavior = "auto";
        levelsMenu.scrollTop = 0;
        
        hideUp(allRecordsPage);

        setTimeout(() => {
            show(levelsMenu);
            showUp(mainHeader);
            show(selectLevels);
            show(moonLevelsUI);
            btnAllRecords.classList.remove("hidden");
            mainMenuRight.classList.remove("go-bottom");
            levelsMenu.style.scrollBehavior = "smooth";
        }, 600);

        setTimeout(() => {
            levelsMenu.scrollTop = levelsMenu.scrollHeight;
        }, 1000);
    }
});

// Cargar ajustes del usuario

function cargarAjustes() {

    // Música
    const musicOn = localStorage.getItem("music") !== "off";
    toggleMusic.checked = musicOn;
    AudioManager.setMusic(musicOn);

    // Efectos de sonido
    const soundOn = localStorage.getItem("sound") !== "off";
    toggleSound.checked = soundOn;
    AudioManager.setSound(soundOn);
};

// Guardar ajustes del usuario
// Se cambian automáticamente cuando el usuario realiza cambios

// Música
toggleMusic.addEventListener("change", () => {
    const enabled = toggleMusic.checked;
    localStorage.setItem("music", enabled ? "on" : "off");

    if (!isPlayingLevel) {
        AudioManager.setMusic(enabled, menuMusic);
    } else {
        AudioManager.music = enabled;
    }
});

// Efectos de sonido

toggleSound.addEventListener("change", () => {
    const enabled = toggleSound.checked;
    localStorage.setItem("sound", enabled ? "on" : "off");
    AudioManager.setSound(enabled);
});

// Borrar datos de usuario

btnBorrarDatos.addEventListener("click", () => {
    openedWarning = true;
    showUp(bannerAlertDelete);
});

closeBannerAlert.addEventListener("click", () => {
    openedWarning = false;
    hideUp(bannerAlertDelete);
});

btnBorrarDatosTotal.addEventListener("click", () => {
    localStorage.removeItem("gameState");
    gameState = resetGameState();
    saveGameState();
    location.reload();
});

// Volver al mapa de niveles

btnGolevels.addEventListener("click", () => {
    openedWarning = true;
    showUp(bannerGoLevels);
});

closeBannerGolevels.addEventListener("click", () => {
    openedWarning = false;
    hideUp(bannerGoLevels);
});

btnGolevelsConfirm.addEventListener("click", () => {

    levelPaused = false;
    openedNiveles = true;
    openedWarning = false;
    openedAjustes = false;

    hideUp(menuAjustes);
    hideUp(headerLevelSettings);
    hideUp(closeLevelSettingsContainer);
    hideUp(bannerGoLevels);

    endLevelNotFinished(playingLevel); // Se finaliza el nivel
    resetLevel(playingLevel); // Se resetea el nivel
    resetGameAfterLevel(); // Se resetea el juego para volver al mapa de niveles

    openedNiveles = true;

    levelUI.classList.remove("paused");
    AudioManager.playSound(selectSound);

    showUp(starsBackground);
    showUp(selectLevels);
    playVideo(starsBackground, "/media/videos/fondo_estrellas.mp4");
    menuPrincipal.classList.remove("hidden", "invisible");

    if(openedNiveles) { // Abrir el menú de niveles

        levelsMenu.style.overflowY = "auto";
        playLevelButton.classList.add("out-screen");

        inOutElements.forEach(element => { // Desaparecen los elementos innecesarios
            hideUp(element);
        });

        hide(characterMain);
        textoFooter.classList.add("hidden");
        mainHeader.classList.add("reduct-margintop");

        // Se actualizan los niveles --> ¿Están desbloqueados o bloqueados?
        updateLevelsState();

        if(gameState.newLevelUnlocked) {
            setTimeout(() => {
                AudioManager.playSound(levelUnlockedEffect);

                alertbox.render({
                    alertIcon: 'info',
                    title: `Nivel desbloqueado`,
                    message: `¡Ya puedes jugar al nivel ${gameState.nivelActual}!`,
                    btnTitle: 'Ir al mapa',
                    border: true
                });

                const alertBtn = document.querySelector(".alert-btn");
                if (alertBtn && !loadingScreen) {
                    alertBtn.addEventListener("click", () => {
                        openLevelsMap();
                    });
                }
            }, 600);

            gameState.newLevelUnlocked = false;
            saveGameState();
            return;

        }else {
            openLevelsMap(); // Abrir mapa de niveles
        }

    };
});

// ----------------------------------------------

function resetMenuPrincipal() {
    
    inOutElements.forEach(element => {
        showUp(element);
    });

    showUp(characterMain);
    showUp(textoFooter);
    showUp(selectLevels);
    showUp(starsBackground);
    showUp(imgCharacter);

    iconoAjustes.src = "/media/icons/icono-config.png";
    tituloPrincipal.textContent = "Welcome to Helea";
    subtituloPrincipal.textContent = "Una aventura espacial";
    mainHeader.classList.remove("reduct-margintop");

    isPlayingLevel = false;
    playingLevel = null;
    levelColor = null;
    branch = null;
    levelIntroEnded = false;
    feedbackMessage = 0;
}

// SISTEMA DE NIVELES
// -----------------------------------------------

// Abrir todos los récords

btnAllRecords.addEventListener("click", () => {

    if(openedNiveles) {

        openedAllRecords = true;
        AudioManager.playSound(selectSound2);
        levelsMenu.style.overflowY = "hidden";
        mainMenuRight.classList.add("go-bottom");

        hide(levelsMenu);
        hideUp(mainHeader);
        hide(selectLevels);
        hide(moonLevelsUI);
        btnAllRecords.classList.add("hidden");

        updateAllRecords();

        setTimeout(() => {
            showUp(allRecordsPage);
        }, 600);
    }
});

// Actualizar todos los récords

function updateAllRecords() {
    
    const recordBoxes = document.querySelectorAll('.record-box');
    
    recordBoxes.forEach((box, index) => {
        const levelNum = index + 1;
        const levelKey = `level${levelNum}`;
        
        const levelRecords = gameState.highScores[levelKey];
        
        if (levelRecords) {
        
            const recordSets = box.querySelectorAll('.record-set');
    
            const formatRecord = (score) => score === 0 ? "-" : `${score} hx.`;
            
            if (recordSets[0]) recordSets[0].textContent = formatRecord(levelRecords["fácil"]);
            if (recordSets[1]) recordSets[1].textContent = formatRecord(levelRecords["normal"]);
            if (recordSets[2]) recordSets[2].textContent = formatRecord(levelRecords["difícil"]);
        }
    });
}

// Seleccionar un nivel

planetsLevelsImg.forEach(planet => {

    planet.addEventListener("click", () => {

        const container = planet.closest(".planet-level-container");
        const isLocked = container.classList.contains("locked");

        if(openedNiveles && !isLocked) {

            AudioManager.playSound(selectSound2);
            levelsMenu.style.overflowY = "hidden";
            mainMenuRight.classList.add("go-bottom");

            selectedLevel = true;

            const nivelNumero = Number(container.dataset.level);
            playingLevel = nivelNumero; // Asignamos el nivel seleccionado al nivel activo

            const nivelTexto = container.querySelector("span").textContent;
            const titulo = container.querySelector("h3").textContent;
            const record = container.querySelector("p").textContent;
            const levelButtons = levelSelectedButtons.querySelectorAll("button");

            const recordColor = container.querySelector("p").style.color;

            planetSelectedInfo.querySelector("span").textContent = nivelTexto;
            planetSelectedInfo.querySelector("h3").textContent = titulo;
            planetSelectedInfo.querySelector("p").textContent = record;
            planetSelectedInfo.querySelector("p").style.color = recordColor;

            planetSelectedImg.classList.add(`planet-level${nivelNumero}`);
            levelSelectedUI.classList.add(`planet-level-container${nivelNumero}`);

            switch (nivelNumero) {
                case 1:
                    levelColor = "rgb(249, 165, 155)";
                    break;
            
                case 2:
                    levelColor = "rgb(205, 81, 81)";
                    break;
                    
                case 3:
                    levelColor = "rgb(254, 227, 93)";
                    break;

                case 4:
                    levelColor = "rgb(189, 110, 217)";
                    break;

                case 5:
                    levelColor = "rgb(228, 115, 170)";
                    break;

                case 6:
                    levelColor = "rgb(217, 97, 54)";
                    break;

                case 7:
                    levelColor = "rgb(200, 93, 202)";
                    break;

                case 8:
                    levelColor = "#adff2f";
                    break;

                default:
                    levelColor = "var(--secundario)";
                    break;
            };

            levelButtons[0].style.backgroundColor = levelColor;
            playLevelButton.style.backgroundColor = levelColor;
            mainHeader.querySelector("h3").style.color = levelColor;
            levelButtons[1].style.backgroundColor = "#fff";

            hide(selectLevels);
            hide(moonLevelsUI);
            hideUp(btnAllRecords);

            setTimeout(() => {
                showUp(levelSelectedUI);
                showUp(levelSelectedButtons);
                selectLevels.classList.add("hidden");
                selectLevels.classList.remove("invisible");
                moonLevelsUI.classList.add("hidden");
                moonLevelsUI.classList.remove("invisible");
            }, 600);

        }else if(openedNiveles && isLocked) {
            container.querySelector("h3").classList.add("warning-level-blocked");
            planet.classList.remove("warning-planet-blocked");
            void planet.offsetWidth;
            planet.classList.add("warning-planet-blocked");

            setTimeout(() => {
                container.querySelector("h3").classList.remove("warning-level-blocked");
                planet.classList.remove("warning-planet-blocked");
            }, 500);
        }
    });
});

// Abrir instrucciones

instructionsButton.addEventListener("click", () => {
    if(openedNiveles && selectedLevel) {

        AudioManager.playSound(selectSound2);

        openedNiveles = false;
        openedLevelInstructions = true;

        hide(levelSelectedUI); // Desaparece el menú principal
        hideUp(mainHeader);

        setTimeout(() => {
            loadInstructions(playingLevel); // Se cargan las instrucciones correspondientes
            showUp(instructionsPage); // Se abren las instrucciones del nivel
            subtituloPrincipal.textContent = `Nivel ${playingLevel}`;
            tituloPrincipal.textContent = "Instrucciones";
            mainHeader.classList.add("instructions-mode");
            showUp(mainHeader);
        }, 800);
    };
});

function loadInstructions(level){

    const stepsData = levelInstructions[level];

    currentStep = 0;
    maxSteps = stepsData.length;

    steps.forEach((img, index) => {

        if(stepsData[index]){
            img.src = stepsData[index].img;
            img.classList.remove("hidden");
        }else{
            img.classList.add("hidden");
        }

        img.classList.remove("active");
    });

    showStep(0);
};

function showStep(index) {
    
    const stepsData = levelInstructions[playingLevel];

    if(index < 0 || index >= stepsData.length) return;

    runningAnimation = true; // Bloqueo de botones mientras dura la animación

    hideUp(mainHeader);

    steps[currentStep].classList.remove("active");
    currentStep = index;
    steps[currentStep].classList.add("active");

    if(index === stepsData.length - 1) {
        nextBtn.classList.add("inactive");
    }else {
        nextBtn.classList.remove("inactive");
    }

    if(index === 0) {
        prevBtn.classList.add("inactive");
    }else {
        prevBtn.classList.remove("inactive");
    }

    setTimeout(() => {
        subtituloPrincipal.textContent = stepsData[currentStep].text1;
        tituloPrincipal.textContent = stepsData[currentStep].text2;
        showUp(mainHeader);
    }, 800);

    setTimeout(() => {
        runningAnimation = false;
    }, 1600);
    
};

nextBtn.addEventListener("click", () => {

    const stepsData = levelInstructions[playingLevel];

    if(runningAnimation) return;

    AudioManager.playSound(selectSound);
    
    if(currentStep < stepsData.length - 1) {
        showStep(currentStep + 1);
    }
});

prevBtn.addEventListener("click", () => {

    if(runningAnimation) return;

    AudioManager.playSound(selectSound);
    
    if(currentStep > 0) {
        showStep(currentStep - 1);
    }
});

// Seleccionar dificultad del nivel

selectDifficultButton.addEventListener("click", () => {

    selectingDifficult = true;
    AudioManager.playSound(selectSound2);

    hideUp(levelSelectedButtons);
    levelSelectedUI.classList.add("flow");
    
    setTimeout(() => {
        levelSelectDifficult.classList.add("invisible");
        levelSelectDifficult.classList.remove("hidden");
    }, 800);

    setTimeout(() => {
        show(levelSelectDifficult);
    }, 1000);
    
});

difficultButtons.forEach(button => {
    button.addEventListener("click", () => {
        AudioManager.playSound(selectSound);

        difficultButtons.forEach(btn => {
            btn.classList.remove("active");
        })

        button.classList.add("active");

        difficultSelected = button.dataset.difficult;

        playLevelButton.classList.remove("out-screen");
    })
});

// Comenzar un nivel

playLevelButton.addEventListener("click", () => { // Click en el botón de jugar el nivel
    if(openedNiveles && selectedLevel) {

        hide(menuPrincipal); // Desaparece el menú principal

        AudioManager.stopMusic(menuMusic);
        AudioManager.playSound(playLevelSound);

        setTimeout(() => {
            menuPrincipal.classList.remove("invisible");
            menuPrincipal.classList.add("hidden");
        }, 1000);

        playLevel();
    }; 
});

function playLevel() {
    const MIN_LOADING_TIME = 7000;
    const startTime = performance.now();

    selectedLevel = false;
    openedNiveles = false;

    /* ------------------------------------- */

    /* Preparación según el nivel seleccionado */

    switch (playingLevel) {
        case 1:
            loadingLevelPage.classList.add("level1");
            levelTitle.textContent = "Musis";
            levelNumTxt.textContent = "Nivel 1";
            levelHeaderTxt.textContent = "Nivel 1: Planeta Musis"; // Cambiamos el nombre del nivel
            level1State.dificultad = difficultSelected; // Establecemos la dificultad elegida por el usuario
        break;

        case 2:
            loadingLevelPage.classList.add("level2");
            levelTitle.textContent = "Meow";
            levelNumTxt.textContent = "Nivel 2";
            levelHeaderTxt.textContent = "Nivel 2: Planeta Meow";
            level2State.dificultad = difficultSelected;
        break;

        case 3:
            loadingLevelPage.classList.add("level3");
            levelTitle.textContent = "Sunder";
            levelNumTxt.textContent = "Nivel 3";
            levelHeaderTxt.textContent = "Nivel 3: Planeta Sunder";
            level3State.dificultad = difficultSelected;
        break;

        case 4:
            loadingLevelPage.classList.add("level4");
            levelTitle.textContent = "Underworld";
            levelNumTxt.textContent = "Nivel 4";
            levelHeaderTxt.textContent = "Nivel 4: Planeta Underworld";
            level4State.dificultad = difficultSelected;
        break;
    
        default:
            break;
    };

    console.log("Jugando al nivel: ", playingLevel);

    /* ------------------------------------- */

    /* Preparación del nivel */

    let assetsNivel = [];
    if (playingLevel === 1) assetsNivel = level1Elements;
    if (playingLevel === 2) assetsNivel = level2Elements;
    if (playingLevel === 3) assetsNivel = level3Elements;
    if (playingLevel === 4) assetsNivel = level4Elements;

    planetSelectedImg.classList.forEach(cls => {  // Quitar las clases innecesarias
        if (cls.startsWith("planet-level")) {
            planetSelectedImg.classList.remove(cls);
        }
    });

    levelSelectedUI.classList.forEach(cls => {  // Quitar las clases innecesarias
        if (cls.startsWith("planet-level-container")) {
            levelSelectedUI.classList.remove(cls);
        }
    });

    hide(levelSelectedUI); // Desaparecen los elementos innecesarios
    hide(starsBackground);
    starsBackground.pause();
    starsBackground.currentTime = 0;
    hideUp(btnAjustes);
    hideUp(mainHeader);

    mainHeader.querySelector("h3").style.color = "var(--secundario)"; // Cambio de colores
    levelTitle.style.color = levelColor;
    
    setTimeout(() => {
        startLevelSequence(assetsNivel);
    }, 1000);
};

async function startLevelSequence(assetsNivel) {
    const MIN_LOADING_TIME = 7000;
    const startTime = performance.now();

    const endTime = performance.now();
    const timeElapsed = endTime - startTime;
    const remainingTime = Math.max(0, MIN_LOADING_TIME - timeElapsed);

    showUp(levelUI);
    showUp(loadingLevelPage);
    startLoadingLevel();

    try {
        await loadMinigameAssets(assetsNivel);

        console.log(`Assets de nivel listos en ${Math.round(timeElapsed)}ms.`);

        setTimeout(() => {
           
            if (loadingLevelInterval) clearInterval(loadingLevelInterval);
            
            levelUI.querySelectorAll("img[data-src]").forEach(img => {
                const rawSrc = img.dataset.src;
                const src = getNormalizedAsset(rawSrc);
                const cached = AssetCache.images[src];
                if (cached) {
                    img.src = cached.src;
                } else {
                    img.src = src;
                }
                img.removeAttribute("data-src");
            });

            prepareLevel();
        }, remainingTime);

    } catch (error) {
        console.error("Fallo al cargar los recursos del nivel:", error);

        setTimeout(() => {
            prepareLevel();
        }, remainingTime);
    }

    levelSelectedUI.classList.add("hidden"); 
    starsBackground.classList.add("hidden");
    menuPrincipal.classList.add("hidden");
    levelsMenu.classList.remove("opened");
    levelsMenu.classList.add("hidden");
    
    menuPrincipal.classList.remove("invisible");
    starsBackground.classList.remove("invisible");
    levelSelectedUI.classList.remove("invisible");
}

async function loadMinigameAssets(list) {
    if (list.length === 0) return Promise.resolve();

    const loaders = list.map(asset => {
        const assetPath = getNormalizedAsset(asset);
       
        if (assetPath.endsWith(".mp4")) {
            return loadVideo(assetPath);
        } 

        else if (assetPath.match(/\.(mp3|wav|ogg|m4a)$/)) {
            return new Promise((resolve) => {
                const audio = new Audio();
                audio.src = assetPath;
                audio.preload = "auto";
                audio.oncanplaythrough = () => resolve();
                audio.onerror = () => resolve();
            });
        } 
    
        else {
            return loadImage(assetPath);
        }
    });

    return Promise.all(loaders);
}

function startLoadingLevel() {
    let txtPosition = 0;
    AudioManager.playMusic(loadingLevelMusic);

    if (loadingLevelInterval) clearInterval(loadingLevelInterval);

    loadingLevelInterval = setInterval(() => {
        const dots = ".".repeat(txtPosition);
        levelLoadingTxt.textContent = "Cargando" + dots;
        txtPosition = (txtPosition + 1) % 4;
    }, 300);
}

function prepareLevel() { // SE PREPARA EL NIVEL CORRESPONDIENTE

    const levelGames = document.querySelectorAll(".level-game");
    const levelPageActual = document.getElementById(`level${playingLevel}-game`); // Según el nivel seleccionado, se abre la UI correspondiente

    levelGames.forEach(level => {
        level.classList.add("hidden");
    });

    if (loadingLevelInterval) {
        clearInterval(loadingLevelInterval);
        loadingLevelInterval = null;
    }
    
    hide(loadingLevelPage);

    levelPageActual.classList.remove("hidden");
    
    levelElements.forEach(element => { // Hacemos desaparecer los elementos del nivel durante los diálogos
        hide(element);
    });

    setTimeout(() => {
        loadingLevelPage.classList.remove("invisible");
        loadingLevelPage.classList.add("hidden");
        show(levelPageActual);
    }, 2000);

    setTimeout(() => {
        if(playingLevel === 1) { // Preparar el nivel 1
            dialogosActivos = dialogosNivel1;
            AudioManager.fadeChangeMusic(musicIntroLevel1); 

        }else if(playingLevel === 2) { // Preparar el nivel 2
            dialogosActivos = dialogosNivel2;
            AudioManager.fadeChangeMusic(musicIntroLevel2);

        }else if(playingLevel === 3) { // Preparar el nivel 3
            dialogosActivos = dialogosNivel3;
            AudioManager.fadeChangeMusic(musicIntroLevel3);

        }else if(playingLevel === 4) { // Preparar el nivel 4
            dialogosActivos = dialogosNivel4;
            AudioManager.fadeChangeMusic(musicIntroLevel4);
        }

        showUp(headerDialoguesLevels);
        runIntroLevel(); // Jugamos el nivel
    }, 3500);
}; 

function runIntroLevel() { // Se inician los diálogos del nivel

    isPlayingLevel = true; // Se está jugando el nivel

    showUp(dialoguesBoxLevels);

    dialogoIndex = 1;
    avanzarDialogoNivel();
};

function endLevelIntro() { // Acaba la intro del nivel

    const levelPageActual = document.getElementById(`level${playingLevel}-game`);

    levelIntroEnded = true;
    hide(dialoguesBoxLevels);
    hide(headerDialoguesLevels);
    hide(levelPageActual);
    
    dialogoIndex = 1;
    
    setTimeout(() => {
        
        switch (playingLevel) {
            case 1:
                levelPageActual.style.backgroundImage = "url('/media/backgrounds/level-backgrounds/level1-dance.png')";
                AudioManager.fadeChangeMusic(musicLevel1);
                AudioManager.playSound(crowdEffect); // Efecto de público gritando
            break;

            case 2:
                levelPageActual.style.backgroundImage = "url('/media/backgrounds/level-backgrounds/level2-space.png')";
                AudioManager.stopMusic(musicIntroLevel2);
            break;

            case 3:
                levelPageActual.style.backgroundImage = "url('/media/backgrounds/level-backgrounds/level3-controls.png')";
                AudioManager.fadeChangeMusic(musicLevel3);
                countDownLv3.classList.remove("hidden");
            break;

            case 4:
                levelPageActual.style.backgroundImage = "url('/media/backgrounds/level-backgrounds/level4-boat.png')";
                AudioManager.fadeChangeMusic(musicLevel4);
            break;
        
            default:
                break;
        }

    }, 1000);

    setTimeout(() => {
        dialoguesBoxLevels.classList.remove("invisible");
        dialoguesBoxLevels.classList.add("hidden");
        headerDialoguesLevels.classList.remove("invisible");
        headerDialoguesLevels.classList.add("hidden");
        
        show(levelPageActual);
        showUp(headerLevel);

    }, 1500);

    setTimeout(() => {
        levelElements.forEach(element => {
            show(element);
        });

        if(playingLevel === 3) {
            countDownLv3.classList.remove("pulse-double-animation");
            void countDownLv3.offsetWidth;
            countDownLv3.classList.add("pulse-double-animation");

            countDownLv3.addEventListener("animationend", () => {
                countDownLv3.classList.remove("pulse-double-animation");
            }, {once: true});
        }
    }, 3000);

    setTimeout(() => {
        runLevel();
    }, 4000);
};

function runLevel() { // Lógica del nivel -- EMPIEZA EL NIVEL!

    console.log("Jugando al nivel: Nº", playingLevel);

    if(playingLevel === 1) {
        startLevel1();
    }else if(playingLevel === 2) {
        startLevel2();
    }else if(playingLevel === 3) {
        startLevel3();
    }else if(playingLevel === 4) {
        startLevel4();
    }
};

btnAjustesLevel.addEventListener("click", (e) => { // Abrir menú de ajustes durante el nivel
    e.stopPropagation();

    if(isPlayingLevel && !openedAjustes && levelIntroEnded) {
        pauseLevel();
        AudioManager.playSound(selectSound2);
        levelPaused = true;
        openedAjustes = true;

        if(playingLevel === 1) {
            level1State.isShowingSequence = true;
        }else if(playingLevel === 2) {
            level2State.blockedButtons = true;
        }
        

        // Cargamos los ajustes de manera visual
        toggleMusic.checked = AudioManager.music;
        toggleSound.checked = AudioManager.sound;

        showUp(menuAjustes);
        showUp(headerLevelSettings);
        showUp(closeLevelSettingsContainer);
    }
});

function pauseLevel() {
    levelPaused = true;
    levelUI.classList.add("paused");

    settingItemGolevels.classList.remove("hidden");

    if (level1State.sequenceTimeouts) {
        level1State.sequenceTimeouts.forEach(clearTimeout);
        level1State.sequenceTimeouts = [];
    }

    switch (playingLevel) {
        case 1:
            level1State.wasShowingSequence = level1State.isShowingSequence;
            level1State.wasBlocked = level1State.blockedButtons;
            level1State.blockedButtons = true;

            if (level1State.sequenceTimeouts) {
                level1State.sequenceTimeouts.forEach(clearTimeout);
                level1State.sequenceTimeouts = [];
            }

            monsters.forEach(m => m.classList.remove("active"));
            hideUp(roundTxts[0]);
            hideUp(correctTxts[0]);
            hideUp(failTxts[0]);
            hideUp(nowYouTxt[0]);

            AudioManager.stopMusic(musicLevel1);
            level1State.isShowingSequence = false;
            break;

        case 2:
            hideUp(roundTxts[1]);
            hideUp(correctTxts[1]);
            hideUp(failTxts[1]);

            if (!level2State.audioPlayer.paused) {
                level2State.audioPlayer.pause();
                level2State.isMusicPlaying = true;
            } else {
                level2State.isMusicPlaying = false;
            }

            if (activeWaveIntervals["level2"]) {
                clearInterval(activeWaveIntervals["level2"]);
                activeWaveIntervals["level2"] = null;
            }

            level2State.wasBlocked = level2State.blockedButtons;
            level2State.blockedButtons = true;

            if (level2State.startTime && !level2State.wasBlocked) {
                const elapsed = (Date.now() - level2State.startTime) / 1000;
                level2State.timeRemaining = Math.max(0, level2State.timeRound - elapsed);

                clearTimeout(level2State.timer);
                clearTimeout(level2State.warningTimer);

                // congelar barra visual
                const computedStyle = window.getComputedStyle(timeBar);
                timeBar.style.transition = 'none';
                timeBar.style.width = computedStyle.width;
            }

            clearLevel2Timeouts();

            level2State.feedbackTimeouts.forEach(clearTimeout);
            level2State.feedbackTimeouts = [];
            break;

        case 3:
            level3State.timerRunning = false;
            level3State.blockedButtons = true;

            if(level3State.gameLoopId) {
                cancelAnimationFrame(level3State.gameLoopId);
                level3State.gameLoopId = null;
            }

            if(timer) { // Paramos la cuenta atrás
                clearInterval(timer);
                timer = null;
            }

            if(level3State.glitchInterval) { // Detenemos los glitches
                clearInterval(level3State.glitchInterval);
                level3State.glitchInterval = null;
            }

            hideUp(roundTxts[2]); // Escondemos los textos que estaban en pantalla
            hideUp(correctTxts[2]);
            hideUp(failTxts[2]);

            AudioManager.stopMusic(musicLevel3);

            if(level3State.feedbackTimeouts) {
                level3State.feedbackTimeouts.forEach(clearTimeout);
                level3State.feedbackTimeouts = [];
            }
            break;

        case 4:
            level4State.wasBlocked = level4State.blockedButtons;
            level4State.blockedButtons = true;

            AudioManager.stopMusic(musicLevel4);

            pauseLevel4Timeouts();
            hideUp(correctTxts[3]);
            hideUp(failTxts[3]);

            levelElements.forEach(e => {
                e.classList.add("paused");
            });
            break;
    
        default:
            break;
    }
};

function resumeLevel() {
    levelPaused = false;
    levelUI.classList.remove("paused");

    switch (playingLevel) {
        case 1:
            AudioManager.playMusic(musicLevel1);

            level1State.playerIndex = 0;
            level1State.blockedButtons = true;
            level1State.isShowingSequence = true;

            if (level1State.sequenceTimeouts) {
                level1State.sequenceTimeouts.forEach(clearTimeout);
                level1State.sequenceTimeouts = [];
            }

            setTimeout(() => {
                if (!levelPaused) repeatRound();
            }, 400);
            break;

        case 2:
            if (level2State.isMusicPlaying) {
                level2State.audioPlayer.play();
                level2State.isMusicPlaying = false;
            }

            stopAllAnimations();
            activeWaveIntervals["level2"] = setInterval(() => {
                moveAudioWaves("level2");
            }, 200);

            level2State.blockedButtons = level2State.wasBlocked ?? false;

            const optionsVisible = document.querySelectorAll('.song-option').length > 0;

            if (!optionsVisible) break;

            if (!level2State.blockedButtons && level2State.timeRemaining > 0) {
                level2State.startTime = Date.now();
                startTimeBar(level2State.timeRemaining);

            }else if (level2State.blockedButtons) {
                setLevel2Timeout(() => {
                    const currentSong = level2State.musicPlaylist[level2State.currentSongIndex];

                    hideUp(correctTxts[1]);
                    hideUp(failTxts[1]);

                    levelElements.forEach(e => {
                        e.classList.remove("playing-animation-pause");
                        e.classList.remove("paused");
                    });

                    const correctBtn = document.querySelector('.option-correct');
                    const wrongBtn = document.querySelector('.option-wrong');

                    if (correctBtn) {
                        endRound({ correct: true, song: currentSong });
                    } else {
                        endRound({ correct: false, song: currentSong });
                    }
                }, 500);
            }

            break;

        case 3:
            levelPaused = false;
            level3State.blockedButtons = false;
            level3State.timerRunning = true;

            AudioManager.playMusic(musicLevel3);

            if(!level3State.roundEnded) {
                startCountDown();
            }

            level3State.lastFrameTime = performance.now();

            const activeMinigame = document.querySelector('.minigame:not(.hidden)');
            const minigameType = activeMinigame ? activeMinigame.dataset.minigame : null;

            if(!level3State.roundEnded) {
                if(minigameType === "speed") {
                    level3State.gameLoopId = requestAnimationFrame(speedLoop);

                } else if(minigameType === "freeze") {
                    level3State.gameLoopId = requestAnimationFrame(fuelLoop);

                } else if(minigameType === "order") {
                   
                    if(level3State.dificultad !== "fácil") {
                        const glitchTime = level3State.dificultad === "difícil" ? 3000 : 4000;
                        level3State.glitchInterval = setInterval(() => {
                            triggerGlitch();
                        }, glitchTime);
                    }
                }
            }

            if(level3State.roundEnded) {
                setTimeout(() => {
                    endRound({completed: level3State.roundEnded});
                }, 500);
            }

            break;

        case 4:
            level4State.blockedButtons = level4State.wasBlocked ?? false;

            AudioManager.playMusic(musicLevel4);

            levelElements.forEach(e => {
                e.classList.remove("paused");
            });

            resumeLevel4Timeouts();

            break;
    
        default:
            break;
    }
};

btnCloseSettingsLevel.addEventListener("click", (e) => {
    e.stopPropagation();

    if(isPlayingLevel && openedAjustes && levelIntroEnded) {
        resumeLevel();
        AudioManager.playSound(selectSound);
        levelPaused = false;
        openedAjustes = false;

        hideUp(menuAjustes);
        hideUp(headerLevelSettings);
        hideUp(closeLevelSettingsContainer);
    }
});

function startLevel1() {
    // Aplicamos la dificultad seleccionada por el usuario

    switch (level1State.dificultad) {
        case "fácil":
            level1State.maxRounds = 5;
            break;

        case "normal":
            level1State.maxRounds = 8;
            break;

        case "difícil":
            level1State.maxRounds = 10;
            break;
    
        default:
            level1State.maxRounds = 8; // Si no hay una dificultad seleccionada
            console.warn("No se ha seleccionado ninguna dificultad. Comenzamos el nivel con la dificultad Normal (por defecto)");
            break;
    }

    level1State.sequence = [];
    level1State.round = 0;
    level1State.correctRounds = 0;
    level1State.incorrectRounds = 0;
    level1State.score = 0;
    level1State.lives = 3;

    puntuacionActual.textContent = level1State.score;

    nextRound();
};

function startLevel2() {
    let selectedPlaylist = [];

    switch (level2State.dificultad) {
        case "fácil":
            selectedPlaylist = easyPlaylist;
            break;
        case "normal":
            selectedPlaylist = normalPlaylist;
            break;
        case "difícil":
            selectedPlaylist = hardPlaylist;
            break;
        default:
            selectedPlaylist = normalPlaylist;
            console.warn("Dificultad no definida → usando normal");
            break;
    }

    level2State.musicPlaylist = getRandomItems(selectedPlaylist, 5);

    console.log("Playlist final:", level2State.musicPlaylist.map(s => s.nombre));

    level2State.currentSongIndex = 0;
    nextRound();
};

function getRandomItems(array, count) {
    const result = [];
    const usedIndexes = new Set();

    while (result.length < count && usedIndexes.size < array.length) {
        const randomIndex = Math.floor(Math.random() * array.length);

        if (!usedIndexes.has(randomIndex)) {
            usedIndexes.add(randomIndex);
            result.push(array[randomIndex]);
        }
    }

    return result;
};

function startLevel3() {

    // Aplicamos la dificultad seleccionada por el usuario

    switch (level3State.dificultad) {
        case "fácil":
            level3State.limiteInferior = 100;
            level3State.limiteSuperior = 300;
            break;

        case "normal":
            level3State.limiteInferior = 150;
            level3State.limiteSuperior = 350;
            break;

        case "difícil":
            level3State.limiteInferior = 250;
            level3State.limiteSuperior = 400;
            break;
    
        default:
            level3State.limiteInferior = 200;
            level3State.limiteSuperior = 300;
            console.warn("Dificultad no definida → usando normal")
            break;
    }

    level3State.miniGamesArray = Array.from(document.querySelectorAll(".minigame"));
    shuffleMinigames(level3State.miniGamesArray);

    nextRound();
};

function startLevel4() {

    let selectedWordSet = [];

    switch (level4State.dificultad) {
        case "fácil":
            selectedWordSet = easyWords;
            break;
        
        case "normal":
            selectedWordSet = normalWords;
            break;

        case "difícil":
            selectedWordSet = hardWords;
            break;

        default:
            selectedWordSet = normalWords;
            console.warn("Dificultad no definida → usando normal")
            break;
    };

    const helexAlmacenado1 = document.querySelector("#helex-almacenado1");
    const helexAlmacenado2 = document.querySelector("#helex-almacenado2");
    const helexAlmacenado3 = document.querySelector("#helex-almacenado3");
    const helexAlmacenado4 = document.querySelector("#helex-almacenado4");
    const helexAlmacenado5 = document.querySelector("#helex-almacenado5");
    const helexAlmacenado6 = document.querySelector("#helex-almacenado6");
    const helexAlmacenado7 = document.querySelector("#helex-almacenado7");

    switch (level4State.dificultad) {
        case "fácil":
            helexAlmacenado1.textContent = "20 hx";
            helexAlmacenado2.textContent = "17 hx";
            helexAlmacenado3.textContent = "14 hx";
            helexAlmacenado4.textContent = "11 hx";
            helexAlmacenado5.textContent = "8 hx";
            helexAlmacenado6.textContent = "5 hx";
            helexAlmacenado7.textContent = "3 hx";
            break;

        case "normal":
            helexAlmacenado1.textContent = "40 hx";
            helexAlmacenado2.textContent = "35 hx";
            helexAlmacenado3.textContent = "30 hx";
            helexAlmacenado4.textContent = "25 hx";
            helexAlmacenado5.textContent = "20 hx";
            helexAlmacenado6.textContent = "10 hx";
            helexAlmacenado7.textContent = "5 hx";
            break;

        case "difícil":
            helexAlmacenado1.textContent = "50 hx";
            helexAlmacenado2.textContent = "43 hx";
            helexAlmacenado3.textContent = "36 hx";
            helexAlmacenado4.textContent = "29 hx";
            helexAlmacenado5.textContent = "22 hx";
            helexAlmacenado6.textContent = "15 hx";
            helexAlmacenado7.textContent = "8 hx";
            break;
    
        default:
            break;
    };

    level4State.wordSet = getRandomWords(selectedWordSet, 5);

    level4State.currentWordIndex = 0;

    nextRound();
};

function getRandomWords(array, count) {
    const result = [];
    const usedIndexes = new Set();

    while (result.length < count && usedIndexes.size < array.length) {
        const randomIndex = Math.floor(Math.random() * array.length);

        if (!usedIndexes.has(randomIndex)) {
            usedIndexes.add(randomIndex);
            result.push(array[randomIndex]);
        }
    }

    return result;
};

function shuffleMinigames(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

function getBaseSpeedByDifficulty() {
    switch(level1State.dificultad) {
        case "fácil": return 900;
        case "normal": return 750;
        case "difícil": return 650;
        default: return 750;
    }
};

function getSpeedDecreaseByDifficulty() {
    switch(level1State.dificultad) {
        case "fácil": return 35;
        case "normal": return 55;
        case "difícil": return 75;
        default: return 55;
    }
};

function getMinSpeedByDifficulty() {
    switch(level1State.dificultad) {
        case "fácil": return 450;
        case "normal": return 380;
        case "difícil": return 320;
        default: return 380;
    }
};

function nextRound() {

    if(playingLevel === 1) {
        
        level1State.playerIndex = 0;
        level1State.round++;

        const baseSpeed = getBaseSpeedByDifficulty();
        const decreasePerRound = getSpeedDecreaseByDifficulty();

        const minSpeed = getMinSpeedByDifficulty();

        level1State.speed = Math.max(
            baseSpeed - ((level1State.round - 1) * decreasePerRound),
            minSpeed
        );
        
        const playbackRate = 1 + ((baseSpeed - level1State.speed) / 800);
        musicLevel1.playbackRate = Math.min(playbackRate, 1.5);
    
        roundTxts[0].textContent = `RONDA ${level1State.round} / ${level1State.maxRounds}`;
        showUp(roundTxts[0]);
    
        setTimeout(() => {
            hideUp(roundTxts[0]);
        }, 2000);
    
        const colors = ["yellow", "orange", "blue", "purple"];
        let randomColor;
    
        do {
            randomColor = colors[Math.floor(Math.random() * colors.length)];
            const lastColor = level1State.sequence[level1State.length - 1];
            const penultimateColor = level1State.sequence[level1State.sequence.length - 2];
            const isThreeInARow = (randomColor === lastColor && randomColor === penultimateColor);

            if(!isThreeInARow) break;
        }while (true);
    
        level1State.sequence.push(randomColor);
    
        setTimeout(() => {
            level1State.isShowingSequence = true;
            playSequence();
        }, 3000);


    }else if(playingLevel === 2) {

        level2State.round++; // Avanzamos una ronda
        level2State.blockedButtons = true;
        timeContainer.classList.add("hidden"); // Ocultamos la barra de tiempo
        timeBar.classList.remove("low-time"); // Quitamos el color rojo, si estaba

        const currentSong = level2State.musicPlaylist[level2State.currentSongIndex];

        clearTimeout(level2State.timer);
        document.getElementById('songs-option-container').innerHTML = ''; // Eliminamos los botones

        setLevel2Timeout(() => {
            roundTxts[1].textContent = `RONDA ${level2State.round} / ${level2State.maxRounds}`;
            showUp(roundTxts[1]);
        }, 1000);

        setLevel2Timeout(() => {
            hideUp(roundTxts[1]);
            timeBar.style.width = "100%"; // Llenamos la barra de tiempo
            infoSongContainer.classList.remove("hidden");
            infoSongContainer.style.display = "flex";
        }, 3000);

        setLevel2Timeout(() => {

            audioWaveLevel2Container.classList.remove("hidden", "invisible");
            showUp(audioWaveLevel2Container);

            stopAllAnimations();
            activeWaveIntervals["level2"] = setInterval(() => {
                moveAudioWaves("level2");
            }, 200);

            songName.textContent = currentSong.nombre;
            songArtist.textContent = currentSong.artista;

            show(infoSongContainer);
            songName.classList.remove("hidden");
            songArtist.classList.remove("hidden");
            songName.style.display = "block";
            songArtist.style.display = "block";

            level2State.audioPlayer.src = currentSong.rutaInicial;
            level2State.audioPlayer.volume = currentSong.volumenPropio || 0.8;
            level2State.audioPlayer.play();
        }, 4500);

        level2State.audioPlayer.onended = () => {
            if(levelPaused) return;
            audioWaveLevel2Container.classList.add("hidden");
            showSongOptions(currentSong);
        };

    }else if(playingLevel === 3) {

        level3State.round++; // Avanzamos ronda

        const currentMinigame = level3State.miniGamesArray[level3State.round - 1];
        
        level3State.timeRound = 10; // Reiniciamos la cuenta atrás
        countDownLv3.textContent = level3State.timeRound; // Actualizamos el tiempo
        countDownLv3.classList.remove("warning-timer"); // El temporizador vuelve a su estado normal
        timer = null;

        level3State.progress = 0; // Reiniciamos el progreso del minijuego
        progressBar.style.width = "0%"; // Reiniciamos la barra de progreso

        gridFuelModules.style.boxShadow = ""; // Reiniciamos el box-shadow del grid container

        level3State.blockedButtons = true; // Bloqueamos cualquier interacción

        miniGames.forEach(minigame => {
            minigame.classList.add("invisible");

            setTimeout(() => {
                minigame.classList.add("hidden");
            }, 1000);
        });

        roundTxts[2].textContent = `RONDA ${level3State.round} / ${level3State.maxRounds}`;
        showUp(roundTxts[2]);

        setTimeout(() => {
            hideUp(roundTxts[2]);
        }, 2000);

        setTimeout(() => {

            switch (currentMinigame.dataset.minigame) {
            case "speed":
                initSpeedMinigame(currentMinigame);
                break;

            case "freeze":
                initFreezeMinigame(currentMinigame);
                break;

            case "order":
                initOrderMinigame(currentMinigame);
                break;

            case "land":
                initLandMinigame(currentMinigame);
                break;

            case "clean":
                initCleanMinigame(currentMinigame);
                break;
        
            default:
                break;
            
            };
        }, 3000);

    }else if(playingLevel === 4) {

        level4State.round++; // Avanzamos una ronda
        level4State.blockedButtons = true;
        level4State.hintsShown = 0;

        const currentWord = level4State.wordSet[level4State.currentWordIndex];

        // Preparar todas las pistas de la ronda
        const pista1txt = document.querySelector("#hint-txt1");
        const pista2txt = document.querySelector("#hint-txt2");
        const pista3txt = document.querySelector("#hint-txt3");
        const pista4txt = document.querySelector("#hint-txt4");
        const pista5txt = document.querySelector("#hint-txt5");
        const pista6txt = document.querySelector("#hint-txt6");
        const pista7txt = document.querySelector("#hint-txt7");

        pista1txt.textContent = currentWord.pista1;
        pista2txt.textContent = currentWord.pista2;
        pista3txt.textContent = currentWord.pista3;
        pista4txt.textContent = currentWord.pista4;
        pista5txt.textContent = currentWord.pista5;
        pista6txt.textContent = currentWord.pista6;
        pista7txt.textContent = currentWord.pista7;

        // Reiniciar pistas
        hintElements.forEach(hint => {
            hint.classList.add("hidden");
            hint.classList.remove("hint-entry", "hint-highlight");
        });

        userMessageInput.value = ""; // Vaciamos la respuesta anterior
        userMessageInput.classList.remove("correct");
        userMessageInput.classList.remove("incorrect");
        
        roundTxts[3].textContent = `RONDA ${level4State.round} / ${level4State.maxRounds}`;
        showUp(roundTxts[3]);

        levelElements.forEach(e => {
            e.classList.add("paused");
        })
        
        setLevel4Timeout(() => {
            hideUp(roundTxts[3]);

            levelElements.forEach(e => {
                e.classList.remove("paused");
            })
        }, 2000);

        setLevel4Timeout(() => {
            showHint();
        }, 3000)
    }
};

// LÓGICA NIVEL 1
// -------------------------

function playSequence() {

    level1State.sequenceTimeouts.forEach(clearTimeout);
    level1State.sequenceTimeouts = [];

    if(level1State.round >= 8) {
        const monstersAreColored = !monsters[0].classList.contains("byw-monster");

        if (monstersAreColored && !level1State.isTransitioningByW) {
            level1State.isTransitioningByW = true;
            bywMonsters(() => {
                level1State.isTransitioningByW = false;
                level1State.readyforSequence = true;
                playSequence();
            });
            return;
        }
    }else {
        monsters.forEach(m => m.classList.remove("byw-monster"));
        level1State.readyforSequence = true;
    }

    if(!level1State.readyforSequence) return;

    level1State.sequence.forEach((color, index) => {
        const timeoutId = setTimeout(() => {
            if (levelPaused) return; // Guardia extra

            activateMonster(color);

            if(index === level1State.sequence.length - 1) {
                const textTimeout = setTimeout(() => {
                    showUp(nowYouTxt[0]);
                }, level1State.speed / 2);

                const hideTimeout = setTimeout(() => {
                    hideUp(nowYouTxt[0]);
                    level1State.isShowingSequence = false;
                }, level1State.speed / 2 + 1000);
                
                level1State.sequenceTimeouts.push(textTimeout, hideTimeout);
            }
        }, index * level1State.speed);
        
        level1State.sequenceTimeouts.push(timeoutId);
    });
};

function repeatRound() {

    level1State.sequenceTimeouts.forEach(clearTimeout);
    level1State.sequenceTimeouts = [];
    level1State.playerIndex = 0;
    level1State.isShowingSequence = true;
    roundTxts[0].textContent = `RONDA ${level1State.round} / ${level1State.maxRounds}`;
    showUp(roundTxts[0]);

    setTimeout(() => {
        hideUp(roundTxts[0]);
        
        setTimeout(() => {
            playSequence();
        }, 1000);
    }, 2000);
};

function playerMove(color) {

    if(level1State.isShowingSequence || levelPaused) return;

    activateMonster(color);

    if(color === level1State.sequence[level1State.playerIndex]) { // Si el jugador acierta
        level1State.playerIndex++;
        level1State.correctRounds++;

        // Si el jugador completa toda la secuencia de la ronda
        if(level1State.playerIndex === level1State.sequence.length) {
            level1State.isShowingSequence = true;
            
            correctTxts[0].textContent = positiveFeedback[feedbackMessage]; 
            feedbackMessage++;

            if(feedbackMessage >= positiveFeedback.length) { // Evitar errores de mensajes
                feedbackMessage = 0;
            }

            showUp(correctTxts[0]); // Felicitación

            setTimeout(() => {
                hideUp(correctTxts[0]);
                endRound({correct: level1State.sequence.length});
            }, 1000);
            
        }

    }else {
        // Si el jugador falla en la secuencia de la ronda
        level1State.isShowingSequence = true;
        flashError();
        showUp(failTxts[0]);
        level1State.incorrectRounds++;

        if(level1State.lives > 0) {
            level1State.lives--;
            console.log("Se ha perdido una vida");
        }
        
        hideUp(vidas[level1State.lives]);

        setTimeout(() => {
            hideUp(failTxts[0]);
            endRound({correct: level1State.playerIndex});
        }, 1000);
    }
};

function bywMonsters(callback) {
    level1State.readyforSequence = false;

    const t1 = setTimeout(() => {
        if (levelPaused) return;
        
        monsters.forEach((monster) => {
            monster.classList.add("byw-monster");
        });

        const t2 = setTimeout(() => {
            if (levelPaused) return;
            if(callback) callback();
        }, 1500);
        
        level1State.sequenceTimeouts.push(t2);
    }, 500);

    level1State.sequenceTimeouts.push(t1);
};

function activateMonster(color) {
    const monster = document.querySelector(`#monster-${color}`);
    const activeTime = level1State.speed * 0.4;

    if (!monster) return;

    monster.classList.add("active");

    const tActive = setTimeout(() => {
        monster.classList.remove("active");
    }, activeTime);

    level1State.sequenceTimeouts.push(tActive);

    if(color === "yellow") AudioManager.playSound(monsterEffect1);
    else if(color === "blue") AudioManager.playSound(monsterEffect2);
    else if(color === "orange") AudioManager.playSound(monsterEffect3);
    else if(color === "purple") AudioManager.playSound(monsterEffect4);
};

monsters.forEach(monster => {
    monster.addEventListener("click", () => {
        if(level1State.isShowingSequence || levelPaused) return;

        const color = monster.dataset.color;

        playerMove(color);
    });
});

// LÓGICA NIVEL 2
// -------------------------

function setLevel2Timeout(fn, delay) {
    const id = window.setTimeout(() => {
        level2State.timeouts.delete(id);
        if (levelPaused) return;
        fn();
    }, delay);

    level2State.timeouts.add(id);
    return id;
};

function clearLevel2Timeouts() {
    level2State.timeouts.forEach(clearTimeout);
    level2State.timeouts.clear();
};

function showSongOptions(song) {
    const container = document.getElementById('songs-option-container');

    level2State.accumulatedTime = 0;

    level2State.blockedButtons = false;

    showUp(timeContainer);

    song.opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'song-option';
        btn.innerHTML = `<h4>${opcion}</h4>`;
        btn.onclick = (event) => checkAnswer(opcion, song, event);
        container.appendChild(btn);
    });

    level2State.startTime = Date.now();
    startTimeBar(level2State.timeRound);
};

function startTimeBar(seconds) {

    timeBar.classList.remove("low-time");
    timeBar.style.transition = "none";

    void timeBar.offsetWidth;

    timeBar.style.transition = `width ${seconds}s linear`;
    timeBar.style.width = "0%";

    if(seconds <= level2State.timeRound * 0.3) {
        timeBar.classList.add("low-time");
    }else {
        const timeUntilRed = (seconds - (level2State.timeRound * 0.3)) * 1000;
        level2State.warningTimer = setLevel2Timeout(() => {
            timeBar.classList.add('low-time');
        }, timeUntilRed);
    }

    level2State.timer = setLevel2Timeout(() => { // Si se agota el tiempo
        handleEndTime();
    }, seconds * 1000);
};   

function handleEndTime() {

    const currentSong = level2State.musicPlaylist[level2State.currentSongIndex];
    document.querySelectorAll(".song-option").forEach(b => b.style.pointerEvents = "none"); // Bloquear botones

    level2State.blockedButtons = true;

    flashError();

    level2State.incorrectRounds++;

    failTxts[1].textContent = "¡TIEMPO!";
    showUp(failTxts[1]);

    if(level2State.lives > 0) { // Se pierde una vida
        level2State.lives--;
    }
    
    hideUp(vidas[level2State.lives]);

    setLevel2Timeout(() => {
        hideUp(failTxts[1]);
        highlightCorrectAnswer(currentSong.correcta);
        endRound({correct: false, song: currentSong}); // Fin de la ronda
    }, 1000);
};

function stopTimeBar() { // Paramos el tiempo
    const computedStyle = window.getComputedStyle(timeBar);
    const currentWidth = computedStyle.getPropertyValue('width');

    timeBar.style.transition = "none";
    timeBar.style.width = currentWidth;

    clearTimeout(level2State.timer);
    clearTimeout(level2State.warningTimer);
};

function checkAnswer(selected, song, event) { // Comprobamos si ha seleccionado la respuesta correcta

    if(level2State.blockedButtons) return; //  Si los botones están bloqueados, no funciona el click

    clearTimeout(level2State.timer);
    level2State.blockedButtons = true;
    stopTimeBar();

    const clickedButton = event.currentTarget;

    // Si la respuesta ES CORRECTA
    if(selected === song.correcta) {

        level2State.correctRounds++;
        
        clickedButton.classList.add("option-correct");
        correctTxts[1].textContent = positiveFeedback[feedbackMessage]; 
        feedbackMessage++;

        if(feedbackMessage >= positiveFeedback.length) {
            feedbackMessage = 0;
        }

        levelElements.forEach(e => {
            e.classList.add("playing-animation-pause");
        })

        AudioManager.playSound(correctAnswer); // Felicitación acústica
        showUp(correctTxts[1]); // Felicitación

        const tEndCorrect = setLevel2Timeout(() => {
            hideUp(correctTxts[1]);
            endRound({correct: true, song: song}); // Fin de la ronda
        }, 1000);

        level2State.feedbackTimeouts.push(tEndCorrect);

        const tAnimCorrect = setLevel2Timeout(() => {
            levelElements.forEach(e => e.classList.remove("playing-animation-pause"));
        }, 1300);

        level2State.feedbackTimeouts.push(tAnimCorrect);

    // Si la respuesta es INCORRECTA
    }else {
        clickedButton.classList.add("option-wrong");
        flashError();

        levelElements.forEach(e => {
            e.classList.add("paused");
        })

        AudioManager.playSound(wrongAnswer); // Fallo acústico
        failTxts[1].textContent = "¡FALLASTE!";
        showUp(failTxts[1]);

        level2State.incorrectRounds++;

        if(level2State.lives > 0) {
            level2State.lives--;
        }
        
        hideUp(vidas[level2State.lives]);

        const tEndWrong = setLevel2Timeout(() => {
            hideUp(failTxts[1]);
            highlightCorrectAnswer(song.correcta);
            endRound({correct: false, song: song});
        }, 1000);

        level2State.feedbackTimeouts.push(tEndWrong);

        const tAnimWrong = setLevel2Timeout(() => {
            levelElements.forEach(e => e.classList.remove("paused"));
        }, 1300);

        level2State.feedbackTimeouts.push(tAnimWrong);
    }
};

function highlightCorrectAnswer(correctText) {
    console.log("Correct text: ", correctText);

    const buttons = document.querySelectorAll(".song-option");

    buttons.forEach(btn => {
        const btnText = btn.querySelector('h4').innerText.toLowerCase().trim();
        const targetText = correctText.toLowerCase().trim();

        if (btnText === targetText) {
            btn.classList.add('option-correct');
            btn.style.transform = "scale(1.05)";
        }
    });
};

// LÓGICA NIVEL 3
// -------------------------

function initSpeedMinigame(currentMinigame) {

    level3State.blockedButtons = true;
    level3State.roundEnded = false;
    level3State.progress = 0;

    whatToDoTxt.textContent = "¡MANTÉN LA VELOCIDAD!";
    showUp(whatToDoTxt);

    setTimeout(() => {
        hideUp(whatToDoTxt);
    }, 2000);

    setTimeout(() => {

        if(currentMinigame) {
            currentMinigame.classList.remove("hidden");

            setTimeout(() => {
                show(currentMinigame);
            }, 100);
        }

        level3State.blockedButtons = false; // Desbloqueamos las interacciones
        startCountDown(); // Empieza la cuenta atrás
    }, 3000);

    speedLoop();
};

function initFreezeMinigame(currentMinigame) {
    level3State.roundEnded = false;
    level3State.blockedButtons = true;
    level3State.progress = 0;

    whatToDoTxt.textContent = "¡ENFRÍA LOS MÓDULOS DE COMBUSTIBLE!";
    showUp(whatToDoTxt);

    setTimeout(() => {
        hideUp(whatToDoTxt);
    }, 2000);

    setTimeout(() => {

        if(currentMinigame) {
            currentMinigame.classList.remove("hidden");

            setTimeout(() => {
                show(currentMinigame);
            }, 100);
        }

        level3State.blockedButtons = false; // Desbloqueamos las interacciones
        initFuelModules();
        startCountDown(); // Empieza la cuenta atrás
        if (level3State.gameLoopId) cancelAnimationFrame(level3State.gameLoopId);
        fuelLoop(); // Inicia el bucle del minijuego
    }, 3000);
};

function initOrderMinigame(currentMinigame) {
    orderMinigameState.targetSequence = [];
    orderMinigameState.playerSequence = [];
    orderMinigameState.currentDial = 0;

    level3State.roundEnded = false;
    level3State.blockedButtons = true;
    level3State.progress = 0;

    whatToDoTxt.textContent = "¡DESCIFRA EL CÓDIGO!";
    showUp(whatToDoTxt);

    setTimeout(() => {
        hideUp(whatToDoTxt);
    }, 2000);

    setTimeout(() => {

        // Programamos los glitches
        if(level3State.dificultad !== "fácil") {
            if(level3State.glitchInterval) clearInterval(level3State.glitchInterval);

            const glitchTime = level3State.dificultad === "difícil" ? 3000 : 4000;

            level3State.glitchInterval = setInterval(() => {
                triggerGlitch();
            }, glitchTime);
        }

        // Hacemos aparecer el minijuego
        if(currentMinigame) {
            currentMinigame.classList.remove("hidden");

            setTimeout(() => {
                show(currentMinigame);
            }, 100);
        }

        level3State.blockedButtons = false; // Desbloqueamos las interacciones
        initOrderDials();
        startCountDown(); // Empieza la cuenta atrás
        renderOrderMinigame();
    }, 3000);

};

function initLandMinigame(currentMinigame) {
    level3State.roundEnded = false;
    level3State.blockedButtons = true;
    level3State.progress = 0;

    whatToDoTxt.textContent = "¡ATERRIZA LA NAVE!";
    showUp(whatToDoTxt);

    setTimeout(() => {
        hideUp(whatToDoTxt);
    }, 2000);

    setTimeout(() => {

        // Hacemos aparecer el minijuego
        if(currentMinigame) {
            currentMinigame.classList.remove("hidden");

            setTimeout(() => {
                show(currentMinigame);
            }, 100);
        }

        level3State.blockedButtons = false; // Desbloqueamos las interacciones
        initSpaceshipRotation();
        startCountDown(); // Empieza la cuenta atrás
    }, 3000);
};

function initCleanMinigame(currentMinigame) {
    level3State.roundEnded = false;
    level3State.blockedButtons = true;
    level3State.progress = 0;

    whatToDoTxt.textContent = "¡LÍMPIALO TODO!";
    showUp(whatToDoTxt);

    setTimeout(() => {
        hideUp(whatToDoTxt);
    }, 2000);

    setTimeout(() => {

        // Hacemos aparecer el minijuego
        if(currentMinigame) {
            currentMinigame.classList.remove("hidden");

            setTimeout(() => {
                show(currentMinigame);
            }, 100);
        }

        level3State.blockedButtons = false; // Desbloqueamos las interacciones
        startCountDown(); // Empieza la cuenta atrás
        initAreaToClean();
    }, 3000);
};

// Iniciar la cuenta atrás del minijuego
function startCountDown() {

    level3State.canWinFuel = false;

    if (timer) clearInterval(timer);

    level3State.timerRunning = true;

    timer = setInterval(() => {
        level3State.timeRound--;

        if(level3State.timeRound <= 3) {
            countDownLv3.classList.add("warning-timer");
        }else {
            countDownLv3.classList.remove("warning-timer");
        }

        countDownLv3.textContent = level3State.timeRound;

        if(level3State.timerRunning && level3State.timeRound <= 0 && !level3State.roundEnded) { // Si se agota el tiempo
            level3State.timeRound = 0;
            stopCountDown();
            endsTimeMiniGame();
            checkGameOver();
        }
    }, 1000);

    setTimeout(() => {
        level3State.canWinFuel = true;
    }, 1500);
};

// Detener la cuenta atrás del minijuego
function stopCountDown() {
    level3State.timerRunning = false;
    clearInterval(timer);
};

// Minijuego de acelerar la nave y mantener la velocidad

function speedLoop() {

    if (level3State.roundEnded) return;

    if(level3State.isPressing && !level3State.blockedButtons && !level3State.roundEnded) {
        level3State.speedCounter += level3State.aceleracion;
    }else {
        level3State.speedCounter -= level3State.deceleracion;
    }

    // Evitamos que la velocidad sea negativa o se exceda de 500
    if(level3State.speedCounter < 0) level3State.speedCounter = 0;
    if(level3State.speedCounter > 500) level3State.speedCounter = 500;

    // Lógica de la barra de progreso
    const inRange = level3State.speedCounter >= level3State.limiteInferior && level3State.speedCounter <= level3State.limiteSuperior;

    if(inRange && !level3State.roundEnded && !level3State.blockedButtons) {
        level3State.progress += level3State.progressSpeed;

        if(level3State.progress >= 100) { // Si la barra llega al 100%

            level3State.progress = 100;
            level3State.roundEnded = true;
            stopCountDown();

            correctTxts[2].textContent = positiveFeedback[feedbackMessage]; 
            feedbackMessage++;

            if(feedbackMessage >= positiveFeedback.length) { // Evitar errores de mensajes
                feedbackMessage = 0;
            }

            levelElements.forEach(e => {
                e.classList.add("playing-animation-pause");
            })

            showUp(correctTxts[2]);
            
            setTimeout(() => {
                hideUp(correctTxts[2]);
                endRound({completed: true}); // Se completa con éxito el minijuego
            }, 1000);

            setTimeout(() => {
                levelElements.forEach(e => {
                    e.classList.remove("playing-animation-pause");
                })
            }, 1300);
        }
    }

    // Actualizamos el contador
    render();
    level3State.gameLoopId = requestAnimationFrame(speedLoop);
};

function render() {
    speedCounterTxt.innerText = Math.floor(level3State.speedCounter);

    // Render de la barra de progreso
    if(progressBar) {
        progressBar.style.width = `${level3State.progress}%`;
    }

    // Feedback visual del rango
    if(level3State.speedCounter >= level3State.limiteInferior && level3State.speedCounter <= level3State.limiteSuperior) {
        speedCounterTxt.classList.remove("speed-warning");
        progressBar.classList.add("progress-active");
    }else {
        speedCounterTxt.classList.add("speed-warning");
        progressBar.classList.remove("progress-active");
    }
};

function updateVisuals(activeController) {
    speedControllers.forEach(controller => { controller.classList.add("hidden") });
    speedControllers[activeController].classList.remove("hidden");
}; 

speedController.addEventListener("touchstart", (e) => {
    if(level3State.blockedButtons || level3State.roundEnded) return;
    e.preventDefault();
    level3State.isPressing = true;
    updateVisuals(1);
});

speedController.addEventListener("touchend", () => {
    level3State.isPressing = false;
    updateVisuals(0);
});

// Minijuego de enfriar módulos de combustible

function fuelLoop() {
    if(level3State.roundEnded) return;

    logicFuelMinigame();

    level3State.gameLoopId = requestAnimationFrame(fuelLoop);
};

function initFuelModules() {
    fuelMinigameState.modules = [];
    gridFuelModules.style.boxShadow = "none";

    let multiplier, hotChance, gracePeriod, minHotModules;

    if (level3State.dificultad === "fácil") {
        multiplier = 0.45;
        hotChance = 0.20;
        gracePeriod = 300;
        minHotModules = 2;
    } else if (level3State.dificultad === "normal") {
        multiplier = 0.65;
        hotChance = 0.30;
        gracePeriod = 240;
        minHotModules = 2;
    } else if(level3State.dificultad === "difícil") {
        multiplier = 0.75;
        hotChance = 0.35;
        gracePeriod = 270;
        minHotModules = 3;
    }

    fuelMinigameState.difficultyMultiplier = multiplier;
    fuelMinigameState.currentGracePeriod = gracePeriod;

    fuelModules.forEach((el, index) => {
        const id = index + 1;
        
        fuelMinigameState.modules.push({
            id: id,
            temp: 0,
            personalHeatRate: Math.random() * 0.15 + 0.1,
            waitFrames: 0,
            isHot: Math.random() < hotChance
        });

        el.classList.remove("shaking", "temp-medium", "temp-high", "temp-critical", "critical-blink");
    });

    let hotCount = fuelMinigameState.modules.filter(m => m.isHot).length;

    while (hotCount < minHotModules) {
        let randomMod = fuelMinigameState.modules[Math.floor(Math.random() * fuelMinigameState.modules.length)];
        if (!randomMod.isHot) {
            randomMod.isHot = true;
            hotCount++;
        }
    }

    fuelMinigameState.modules.forEach(mod => {
        if (mod.isHot) {
            mod.temp = Math.random() * 20 + 50; // Más caliente desde el inicio
        } else {
            mod.temp = Math.random() * 10 + 5;
        }
        delete mod.isHot;
    });
};

function logicFuelMinigame() {
    if(!level3State.timerRunning || level3State.roundEnded) return;

    let anyExploded = false;
    let allWhite = true;

    fuelMinigameState.modules.forEach(mod => {
        
        if (mod.waitFrames > 0) {
            // Si tiene tiempo de espera, restamos un frame y NO calentamos
            mod.waitFrames--;
            mod.temp = 0;
        } else {
            // Si no hay espera, el calor sube rápido
            mod.temp += mod.personalHeatRate * fuelMinigameState.difficultyMultiplier;
        }

        if(mod.temp >= 110) {
            mod.temp = 110;
            anyExploded = true;
        }

        // Para ganar todos deben estar muy fríos
        if (mod.temp > 35) allWhite = false;

        renderModule(mod);
    });

    // 1. DERROTA: Un módulo llega al crítico (100 grados)
    if(anyExploded) {
        level3State.roundEnded = true;
        failTxts[2].textContent = "¡EXPLOTÓ UNA BARRA!";
        loseMinigame();
        return;
    }

    // 2. VICTORIA: Se consigue enfriar todos los módulos (por debajo de 5 grados)

    if(allWhite && level3State.canWinFuel && !level3State.roundEnded) {
        level3State.roundEnded = true;
        level3State.progress = 100;
        level3State.correctRounds++;
        stopCountDown();

        gridFuelModules.style.boxShadow = "0 0 40px rgba(0, 255, 0, 0.7)";

        correctTxts[2].textContent = positiveFeedback[feedbackMessage]; 
        feedbackMessage++;

        if(feedbackMessage >= positiveFeedback.length) { // Evitar errores de mensajes
            feedbackMessage = 0;
        }

        levelElements.forEach(e => {
            e.classList.add("playing-animation-pause");
        })

        showUp(correctTxts[2]);
        
        setTimeout(() => {
            hideUp(correctTxts[2]);
            endRound({completed: true});
        }, 1000);

        setTimeout(() => {
            levelElements.forEach(e => {
                e.classList.remove("playing-animation-pause");
            })
        }, 1300);
    }
};

gridFuelModules.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const target = e.target;

    if(target.classList.contains("fuel-module")) {
        const id = parseInt(target.dataset.id);
        tapModule(id);
    }
});

function renderModule(mod) {
    const el = document.querySelector(`.fuel-module[data-id="${mod.id}"]`);
    if(!el) return;

    el.classList.remove("temp-medium", "temp-high", "temp-critical");

    if(mod.temp >= 100) {
        el.classList.add("temp-critical");
    }else if(mod.temp > 70) {
        el.classList.add("temp-high");
    }else if(mod.temp > 35) {
        el.classList.add("temp-medium");
    }

    if(mod.temp > 80) {
        el.classList.add("critical-blink");
    }else {
        el.classList.remove("critical-blink");
    }
};

function tapModule(id) {
    if(level3State.blockedButtons || level3State.roundEnded) return;

    const mod = fuelMinigameState.modules.find(m => m.id === id);
    if(!mod) return;

    mod.temp -= 60; // Cada toque baja 60 grados la temperatura

    if(mod.temp <= 0) {
        mod.temp = 0;
        mod.waitFrames = fuelMinigameState.currentGracePeriod;
    }

    // Feedback visual inmediato
    const el = document.querySelector(`.fuel-module[data-id="${id}"]`);
    el.style.filter = "brightness(2)";
    setTimeout(() => { el.style.filter = ""; }, 50);
};

function endsTimeMiniGame() { // Gestión del countdown. ¿Qué pasa si se acaba el tiempo?
    failTxts[2].textContent = "¡TIEMPO!";
    loseMinigame();
};

function loseMinigame() { // Cuando se pierde un minijuego

    level3State.blockedButtons = true;
    level3State.roundEnded = true;
    flashError();
    stopCountDown();
    level3State.incorrectRounds++;

    levelElements.forEach(e => {
        e.classList.add("paused");
    })

    showUp(failTxts[2]);

    if (level3State.glitchInterval) { // Eliminamos los intervalos activos
        clearInterval(level3State.glitchInterval);
        level3State.glitchInterval = null;
    }

    if(level3State.lives > 0) { // Se pierde una vida
        level3State.lives--;
    }
    
    hideUp(vidas[level3State.lives]);

    setTimeout(() => {
        hideUp(failTxts[2]);
        endRound({completed: false}); // Fin de la ronda
    }, 1000);

    setTimeout(() => {
        levelElements.forEach(e => {
            e.classList.remove("paused");
        })
    }, 1300);
};

// Minijuego de ordenar diales en el orden correcto

function initOrderDials() {
    let numIcons;

    if(level3State.dificultad === "fácil") {
        numIcons = 3;
    } else if(level3State.dificultad === "normal") {
        numIcons = 4;
    } else if(level3State.dificultad === "difícil") {
        numIcons = 4;
    }

    for(let i = 0; i < numIcons; i++) {

        const randomIcon = orderMinigameState.symbols[Math.floor(Math.random() * orderMinigameState.symbols.length)];
        orderMinigameState.targetSequence.push(randomIcon);

        let startIndex = Math.floor(Math.random() * orderMinigameState.symbols.length);
        
        if (orderMinigameState.symbols[startIndex] === randomIcon) {
            startIndex = (startIndex + 1) % orderMinigameState.symbols.length;
        }
        
        orderMinigameState.playerSequence.push(orderMinigameState.symbols[startIndex]);
    }

    if (gridOrderContainer) gridOrderContainer.style.boxShadow = "none";
};

function renderOrderMinigame() {
    targetCont.innerHTML = "";
    dialsCont.innerHTML = "";

    const numIcons = orderMinigameState.targetSequence.length;
    dialsCont.className = "";
    dialsCont.classList.add(`grid-${numIcons}`);

    orderMinigameState.targetSequence.forEach(icon => {
        targetCont.innerHTML += `<div class="target-icon">${icon}</div>`;
    });

    orderMinigameState.playerSequence.forEach((icon, index) => {
        
        dialsCont.innerHTML += `
           <div class="dial" data-index="${index}">
                ${icon}
            </div>`; 
    });
};

dialsCont.addEventListener("touchstart", (e) => {
    
    e.preventDefault(); 
    
    const dial = e.target.closest(".dial");

    if (dial && !level3State.blockedButtons && !level3State.roundEnded) {
        const index = parseInt(dial.dataset.index);
        level3State.currentlyTappingIndex = index;
        cycleIcon(index);
    }
});

dialsCont.addEventListener("touchend", () => {
    setTimeout(() => {
        level3State.currentlyTappingIndex = null;
    }, 150); 
});

function cycleIcon(index) {
    if(level3State.blockedButtons || level3State.roundEnded) return;

    let symbolIndex = orderMinigameState.symbols.indexOf(orderMinigameState.playerSequence[index]);
    symbolIndex = (symbolIndex + 1) % orderMinigameState.symbols.length;
    orderMinigameState.playerSequence[index] = orderMinigameState.symbols[symbolIndex];

    const dialEl = document.querySelector(`.dial[data-index="${index}"]`);
    dialEl.textContent = orderMinigameState.playerSequence[index];
    
    dialEl.classList.remove("dial-spin");
    void dialEl.offsetWidth; 
    dialEl.classList.add("dial-spin");

    checkWinConditionOrder();
};

function triggerGlitch() {
    if(level3State.roundEnded || level3State.blockedButtons) return;

    let numGlitches = (level3State.dificultad === "normal") ? 1 : 2;
    let availableIndices = [];

    orderMinigameState.playerSequence.forEach((_, index) => {
        if(index !== level3State.currentlyTappingIndex) {
            availableIndices.push(index);
        }
    });

    if(availableIndices.length === 0) return;

    for (let i = 0; i < numGlitches; i++) {
        
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        
        let newIndex = Math.floor(Math.random() * orderMinigameState.symbols.length);
        orderMinigameState.playerSequence[randomIndex] = orderMinigameState.symbols[newIndex];

        const dialEl = document.querySelector(`.dial[data-index="${randomIndex}"]`);
        if (dialEl) {
            dialEl.textContent = orderMinigameState.playerSequence[randomIndex];
            dialEl.classList.add("glitch-effect");
            setTimeout(() => dialEl.classList.remove("glitch-effect"), 500);
        }
        
        availableIndices = availableIndices.filter(idx => idx !== randomIndex);
        if (availableIndices.length === 0) break;
    }

    checkWinConditionOrder();
};

function checkWinConditionOrder() {
    const isCorrect = orderMinigameState.playerSequence.every((val, index) => 
        val === orderMinigameState.targetSequence[index]
    );

    if(isCorrect) {
        victoryOrderMinigame(); // Minijuego completado con éxito
    }
};

function victoryOrderMinigame() {
    level3State.roundEnded = true;
    stopCountDown();

    if (level3State.glitchInterval) {
        clearInterval(level3State.glitchInterval);
        level3State.glitchInterval = null;
    }

    const allDials = document.querySelectorAll(".dial");

    allDials.forEach(dial => {
        dial.classList.add("correct-dial");
    });

    gridOrderContainer.style.boxShadow = "0 0 40px rgba(0, 255, 0, 0.7)";

    level3State.progress = 100;
    level3State.correctRounds++;

    setTimeout(() => {
        correctTxts[2].textContent = positiveFeedback[feedbackMessage]; 
        feedbackMessage++;
    
        if(feedbackMessage >= positiveFeedback.length) { // Evitar errores de mensajes
            feedbackMessage = 0;
        }

        levelElements.forEach(e => {
            e.classList.add("playing-animation-pause");
        })
    
        showUp(correctTxts[2]); // Felicitación
    }, 1200);

    setTimeout(() => {
        hideUp(correctTxts[2]);
        endRound({completed: true});
    }, 2200);

    setTimeout(() => {
        levelElements.forEach(e => {
            e.classList.remove("playing-animation-pause");
        })
    }, 3000);
};

// Minijuego de estabilizar la nave y aterrizar

function initSpaceshipRotation() {

    if (level3State.dificultad === "fácil") {
        level3State.intentosFallidosObligatorios = 0;
    } 
    else if (level3State.dificultad === "normal") {
        level3State.intentosFallidosObligatorios = Math.random() < 0.5 ? 1 : 0;
    } 
    else if (level3State.dificultad === "difícil") {
        level3State.intentosFallidosObligatorios = 1;
    }

    level3State.inclinacionObjetivo = generarNuevoAngulo();

    goalAngleDisplay.textContent = `${Math.round(level3State.inclinacionObjetivo)}`;
    actualizarVisualizacionNave();
};

function generarNuevoAngulo() {
    let nuevoAngulo;

    do{
        nuevoAngulo = Math.floor(Math.random() * 90) - 45;
    }while (Math.abs(nuevoAngulo - level3State.inclinacionActual) < 20);

    return nuevoAngulo;
};

function startRotation(direccion) {
    if(level3State.rotationInterval) return;

    level3State.rotationInterval = setInterval(() => {
        const velocidad = 1;

        if(direccion === 'izq') {
            level3State.inclinacionActual -= velocidad;
        }else {
            level3State.inclinacionActual += velocidad;
        }

        level3State.inclinacionActual = Math.max(-60, Math.min(60, level3State.inclinacionActual));
        actualizarVisualizacionNave();
    }, 30);
};

function stopRotation() {
    clearInterval(level3State.rotationInterval);
    level3State.rotationInterval = null;
};

function actualizarVisualizacionNave() {
    naveDisplay.style.transform = `rotate(${level3State.inclinacionActual}deg)`;

    if(actualAngleDisplay) {
        actualAngleDisplay.textContent = `${Math.round(level3State.inclinacionActual)}°`;
    }

    const diferencia = Math.abs(level3State.inclinacionActual - level3State.inclinacionObjetivo);

    if(diferencia <= level3State.margenError) {
        naveDisplay.style.filter = "drop-shadow(0 0 10px #2ecc71)";
    }else {
        naveDisplay.style.filter = "none";
    }
};

function checkLanding() {
    const diferencia = Math.abs(level3State.inclinacionActual - level3State.inclinacionObjetivo);

    if(diferencia <= level3State.margenError) {
        if(level3State.intentosFallidosObligatorios > 0) {
            procesarFalloTecnico();
        }else {
            victoryLandMinigame(); // Minijuego completado con éxito
        }
    }else {
        flashError();
    }
};

function victoryLandMinigame() {
    level3State.roundEnded = true;
    stopCountDown();

    level3State.progress = 100;
    level3State.correctRounds++;

    naveDisplay.style.transform = "translateY(40px)";
    AudioManager.playSound(landingSound);

    setTimeout(() => {
        correctTxts[2].textContent = positiveFeedback[feedbackMessage]; 
        feedbackMessage++;
    
        if(feedbackMessage >= positiveFeedback.length) { // Evitar errores de mensajes
            feedbackMessage = 0;
        }

        levelElements.forEach(e => {
            e.classList.add("playing-animation-pause");
        })
    
        showUp(correctTxts[2]); // Felicitación
    }, 1200);

    setTimeout(() => {
        hideUp(correctTxts[2]);
        endRound({completed: true});
    }, 2200);

    setTimeout(() => {
        levelElements.forEach(e => {
            e.classList.remove("playing-animation-pause");
        })
    }, 3000);
};

function procesarFalloTecnico() {
    level3State.intentosFallidosObligatorios--;
    level3State.inclinacionObjetivo = generarNuevoAngulo();

    naveDisplay.classList.add("error-aterrizaje"); 
    AudioManager.playSound(errorLandingSound);
    goalAngleDisplay.textContent = `${Math.round(level3State.inclinacionObjetivo)}`;

    setTimeout(() => {
        naveDisplay.classList.remove("error-aterrizaje");
    }, 2000);
};

leftStabilizer.addEventListener("touchstart", (e) => {
    e.preventDefault();
    startRotation('izq');
});

leftStabilizer.addEventListener("touchend", () => {
    stopRotation();
});

rightStabilizer.addEventListener("touchstart", (e) => {
    e.preventDefault();
    startRotation('der');
});

rightStabilizer.addEventListener("touchend", () => {
    stopRotation();
});

btnAterrizar.addEventListener("click", () => {
    checkLanding();
});

// Minijuego de limpiar basura espacial

function initAreaToClean() {
    let numManchas;
    areaToClean.innerHTML = "";
    
    if(level3State.dificultad === "fácil") {
        numManchas = 6
    } else if(level3State.dificultad === "normal") {
        numManchas = 8;
    } else if(level3State.dificultad === "difícil") {
        numManchas = 12;
    }

    level3State.manchasRestantes = numManchas;

    for (let i = 0; i < numManchas; i++) {
        const manchaImg = document.createElement('img');

        let min, max;

        if(level3State.dificultad === "fácil") {
            min = 2; max = 5;

        }else if(level3State.dificultad === "normal") {
            min = 3; max = 6;

        }else {
            min = 4; max = 7;
        }

        const vidaAleatoria = Math.floor(Math.random() * (max - min + 1)) + min;

        const randomImg = level3State.assetsManchas[Math.floor(Math.random() * level3State.assetsManchas.length)];

        manchaImg.src = randomImg;
        manchaImg.classList.add("mancha-espacial");

        const posX = Math.random() * 80 + 10;
        const posY = Math.random() * 80 + 10;

        manchaImg.style.left = `${posX}%`;
        manchaImg.style.top = `${posY}%`;

        const rotacion = Math.random() * 360; 
        manchaImg.style.transform = `rotate(${rotacion}deg) scale(1)`;
        
        manchaImg.dataset.hits = vidaAleatoria;
        manchaImg.dataset.rotation = rotacion;
        manchaImg.dataset.maxHits = vidaAleatoria;

        manchaImg.addEventListener("pointerdown", (e) => {
            limpiarMancha(e.target);
        })

        areaToClean.appendChild(manchaImg);
    }
};

function limpiarMancha(target) {
    let hits = parseInt(target.dataset.hits);
    const maxHits = parseInt(target.dataset.maxHits);
    
    hits--;
    target.dataset.hits = hits;

    const rot = target.dataset.rotation;
    
    const progreso = hits / maxHits;
    const escalaMinima = 0.65;
    const escalaVisual = escalaMinima + (progreso * (1 - escalaMinima));

    target.style.transition = "none";
    target.style.transform = `rotate(${rot}deg) scale(${escalaVisual + 0.15})`;
    target.style.filter = `brightness(1.8) drop-shadow(0 0 10px white)`;

    setTimeout(() => {
        target.style.transition = "transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.2s, opacity 0.2s";
        target.style.transform = `rotate(${rot}deg) scale(${escalaVisual})`;
        target.style.opacity = 0.6 + (progreso * 0.4);
        target.style.filter = `grayscale(${100 - (progreso * 100)}%)`;
    }, 60);

    if (hits <= 0) {
        ejecutarEfectoExplosion(target);
    }
}

function ejecutarEfectoExplosion(target) {
    target.style.pointerEvents = "none";
    level3State.manchasRestantes--;

    verificarVictoriaLimpieza();

    target.style.transition = "all 0.2s ease-out";
    target.style.transform = `${target.style.transform} scale(1.8)`;
    target.style.opacity = "0";
    target.style.filter = "brightness(4)";

    setTimeout(() => {
        target.remove();
    }, 150);
};

function verificarVictoriaLimpieza() {
    if (level3State.manchasRestantes === 0) {
        
        stopCountDown();
        level3State.roundEnded = true;
        areaToClean.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        areaToClean.style.transition = "background-color 0.5s ease";
        
        setTimeout(() => {
            victoryCleanMinigame();
        }, 500);
    }
};

function victoryCleanMinigame() {
    level3State.roundEnded = true;
    level3State.progress = 100;
    level3State.correctRounds++;

    correctTxts[2].textContent = positiveFeedback[feedbackMessage];
    feedbackMessage = (feedbackMessage + 1) % positiveFeedback.length;

    if(feedbackMessage >= positiveFeedback.length) { // Evitar errores de mensajes
        feedbackMessage = 0;
    }

    levelElements.forEach(e => {
        e.classList.add("paused");
    })

    showUp(correctTxts[2]); 

    setTimeout(() => {
        hideUp(correctTxts[2]);
        endRound({completed: true});
    }, 1000);

    setTimeout(() => {
        levelElements.forEach(e => {
            e.classList.remove("paused");
        })
    }, 1800);
};

// LÓGICA NIVEL 4
// -----------------------------------

function setLevel4Timeout(callback, delay) {
    const timeoutData = {
        callback,
        delay,
        remaining: delay,
        start: Date.now(),
        id: null
    };

    timeoutData.id = setTimeout(() => {

        level4State.activeTimeouts =
            level4State.activeTimeouts.filter(t => t !== timeoutData);

        if(levelPaused) return;

        callback();

    }, delay);

    level4State.activeTimeouts.push(timeoutData);

    return timeoutData;
};

function clearLevel4Timeouts() {
    level4State.activeTimeouts.forEach(timeout => {
        clearTimeout(timeout.id);
    });

    level4State.activeTimeouts = [];
};

function pauseLevel4Timeouts() {
    level4State.activeTimeouts.forEach(timeout => {

        clearTimeout(timeout.id);

        const elapsed = Date.now() - timeout.start;

        timeout.remaining -= elapsed;
    });
};

function resumeLevel4Timeouts() {
    level4State.activeTimeouts.forEach(timeout => {

        timeout.start = Date.now();

        timeout.id = setTimeout(() => {

            level4State.activeTimeouts =
                level4State.activeTimeouts.filter(t => t !== timeout);

            if(levelPaused) return;

            timeout.callback();

        }, timeout.remaining);
    });
};

function showHint() {

    if(level4State.hintsShown >= 7) return; // Si ya hay 7 pistas activas, el jugador debe resolver

    level4State.hintsShown++;

    level4State.blockedButtons = false; // Se desbloquean los botones

    AudioManager.playSound(newHintSound);

    helexAlmacenadoBoxes.forEach(box => {
        hide(box);
    });

    show(helexAlmacenadoBoxes[level4State.hintsShown-1]);

    const identifier = document.querySelector(`#hint${level4State.hintsShown}`);
    
    identifier.classList.remove("hint-entry");
    void identifier.offsetWidth;

    identifier.classList.remove("hidden");
    identifier.classList.add("hint-entry", "hint-highlight");

    scrollHints.scrollTo({
        top: scrollHints.scrollHeight,
        behavior: 'smooth'
    });
};

newHintBtn.addEventListener("click", () => {
    if(level4State.blockedButtons) return;

    if (newHintBtn.classList.contains('relevance')) {
        newHintBtn.classList.remove('relevance');
    }

    showHint();
});

tryBtn.addEventListener("click", () => {
    if(level4State.blockedButtons) return;

    if (newHintBtn.classList.contains('relevance')) {
        newHintBtn.classList.remove('relevance');
    }

    level4State.blockedButtons = true; // Se bloquean los botones durante la comprobación
    tryAnswer();
});

function tryAnswer() {
    const writtenMessage = userMessageInput.value.trim().toLowerCase();
    const currentWord = level4State.wordSet[level4State.currentWordIndex];
    
    // Comprobar respuesta
    const isCorrect = currentWord.respuestasCorrectas.some(answer => 
        answer.toLowerCase().trim() === writtenMessage
    );

    const isEmpty = writtenMessage === "";

    if (isCorrect) {
        // Respuesta correcta
        level4State.correctRounds++;
        userMessageInput.classList.add("correct");

        correctTxts[3].textContent = positiveFeedback[feedbackMessage]; 
        feedbackMessage++;

        if(feedbackMessage >= positiveFeedback.length) {
            feedbackMessage = 0;
        }

        levelElements.forEach(e => {
            e.classList.add("paused");
        })

        AudioManager.playSound(correctAnswer); // Felicitación acústica
        showUp(correctTxts[3]); // Felicitación

        setLevel4Timeout(() => {
            hideUp(correctTxts[3]);
            endRound({correct: true}); // Fin de la ronda
        }, 1000);

    } else if(isEmpty) {
        // Respuesta vacía
        userMessageInput.placeholder = "???";
        userMessageInput.classList.add("placeholder-violet");
        level4State.blockedButtons = false;

        setLevel4Timeout(() => {
            userMessageInput.placeholder = "Escribe aquí...";
            userMessageInput.classList.remove("placeholder-violet");
        }, 2000);

    } else {
        // Respuesta incorrecta
        flashError();
        level4State.incorrectRounds++;

        levelElements.forEach(e => {
            e.classList.add("paused");
        });

        AudioManager.playSound(wrongAnswer); // Fallo acústico
        failTxts[3].textContent = "¡FALLASTE!";
        showUp(failTxts[3]);

        userMessageInput.classList.add("incorrect");

        if(level4State.lives > 0) {
            level4State.lives--;
        }
        
        hideUp(vidas[level4State.lives]);

        setLevel4Timeout(() => {
            hideUp(failTxts[3]);

            levelElements.forEach(e => {
                e.classList.remove("paused");
            });

            const endGame = checkGameOver();

            if(endGame) {
                hide(levelUI); // Si hay Game Over...

                setLevel4Timeout(() => {
                    game = false;
                    gameOver = true;
                    levelUI.classList.remove("invisible");
                    levelUI.classList.add("hidden");
                    setGameOver(`level${playingLevel}`); // Se abre la página de Game Over correspondiente al nivel
                    resetLevel(playingLevel); // Se resetea el nivel actual
                    resetGameAfterLevel(); // Se resetea el juego
                }, 600);

                return;
            }

        }, 1000);

        setLevel4Timeout(() => {
            userMessageInput.value = ""; // Vaciamos la respuesta
            userMessageInput.classList.remove("incorrect"); // Quitamos el color destacado
            level4State.blockedButtons = false; // Desbloqueamos los botones para seguir jugando
            onPlayerFail();
        }, 2500);
    }
};

function onPlayerFail() {
    newHintBtn.classList.add('relevance');
};

// LÓGICA GENERAL DE LOS NIVELES
// -----------------------------------

function flashError() {
    levelUI.classList.add("screen-shake");

    levelUI.addEventListener("animationend", () => {
        levelUI.classList.remove("screen-shake");
    }, {once: true});
};

function endRound({correct, song, completed}) {
    let pointsWon = null;

    if(playingLevel === 1) {

        pointsWon = calculatePointsL1(
            correct,
            level1State.sequence.length
        );

        level1State.score += pointsWon;

        setTimeout(() => {
            puntuacionActual.textContent = level1State.score; // Se actualiza la puntuación total tras la ronda
            hide(puntosGanados);
        }, 2000);

    }else if(playingLevel === 2) {

        pointsWon = calculatePointsL2(correct);
        level2State.score += pointsWon;

        setTimeout(() => {
            puntuacionActual.textContent = level2State.score; // Se actualiza la puntuación total tras la ronda
            hide(puntosGanados);
        }, 2000);

    }else if(playingLevel === 3) {

        level3State.blockedButtons = true;
        level3State.roundEnded = true;
        level3State.timerRunning = false;

        if(level3State.gameLoopId) cancelAnimationFrame(level3State.gameLoopId);
        
        pointsWon = calculatePointsL3(completed);
        level3State.score += pointsWon;

        setTimeout(() => {
            puntuacionActual.textContent = level3State.score; // Se actualiza la puntuación total tras la ronda
            hide(puntosGanados);
        }, 2000);

    }else if(playingLevel === 4) {

        level4State.blockedButtons = true;
        level4State.roundEnded = true;
        
        pointsWon = calculatePointsL4();
        level4State.score += pointsWon;

        setLevel4Timeout(() => {
            puntuacionActual.textContent = level4State.score; // Se actualiza la puntuación total tras la ronda
            hide(puntosGanados);
        }, 2000);
    }
    
    puntosGanados.textContent = `+ ${pointsWon}`; // Aparecen los puntos ganados en la ronda
    show(puntosGanados);

    setTimeout(() => {
        const endGame = checkGameOver(); // Se verifica si hay un Game Over

        if(endGame) {
            hide(levelUI); // Si hay Game Over...

            setTimeout(() => {
                game = false;
                gameOver = true;
                levelUI.classList.remove("invisible");
                levelUI.classList.add("hidden");
                setGameOver(`level${playingLevel}`); // Se abre la página de Game Over correspondiente al nivel
                resetLevel(playingLevel); // Se resetea el nivel actual
                resetGameAfterLevel(); // Se resetea el juego
            }, 600);

            return;
        }

        // Si era la última ronda

        if(level1State.round >= level1State.maxRounds) { 
            finishLevel(playingLevel);
            return;
        };

        if(level2State.round >= level2State.maxRounds) {

            level2State.audioPlayer.src = song.rutaFinal;
            level2State.audioPlayer.volume = song.volumenPropio || 0.8; 
            level2State.audioPlayer.play(); // Suena el resto de la canción

            level2State.audioPlayer.onended = () => { // Cuando acaba el resto de la canción

                setTimeout(() => {
                    hide(infoSongContainer);
                    finishLevel(playingLevel);
                }, 1000);
            };

            return;
        };

        if(level3State.round >= level3State.maxRounds) {
            finishLevel(playingLevel);
            return;
        };

        if(level4State.round >= level4State.maxRounds) {
            finishLevel(playingLevel);
            return;
        };

        // Si todavía quedan rondas

        switch (playingLevel) {
            case 1:
                level1State.speed = Math.max(350, Math.round(level1State.speed * 0.92));
                nextRound();
            break;

            case 2:
                level2State.audioPlayer.src = song.rutaFinal;
                level2State.audioPlayer.volume = song.volumenPropio || 0.8; 
                level2State.audioPlayer.play(); // Suena el resto de la canción

                level2State.audioPlayer.onended = () => { // Cuando acaba el resto de la canción
                    level2State.currentSongIndex ++;

                    setTimeout(() => {
                        hide(infoSongContainer);
                        nextRound();
                    }, 1000);
                }
            break;

            case 3:
                miniGames.forEach(minigame => { 
                    minigame.classList.add("invisible");
                    
                    setTimeout(() => {
                        minigame.classList.add("hidden");
                        
                    }, 1000);
                });

                nextRound();
            break;

            case 4:
                    level4State.currentWordIndex++;

                    setTimeout(() => {
                        nextRound();
                    }, 1000);
            break;
        
            default:
                break;
        }

    }, 1200);
};

function calculatePointsL1(correct, total) {

    let maxPoints = 0;

    if(level1State.dificultad === "fácil") {
        maxPoints = level1State.maxPointsEasy;
    }else if(level1State.dificultad === "normal") {
        maxPoints = level1State.maxPointsNormal;
    }else if(level1State.dificultad === "difícil") {
        maxPoints = level1State.maxPointsHard;
    }

    const ratio = correct / total;
    return Math.floor(maxPoints * ratio);
};

function calculatePointsL2(correct) {
    if(!correct) return 0; // Si el jugador falló, no obtiene puntos

    let basePoints = 0;
    const diff = level2State.dificultad;

    if(diff === "fácil") basePoints = level2State.maxPointsEasy;
    else if(diff === "normal") basePoints = level2State.maxPointsNormal;
    else if(diff === "difícil") basePoints = level2State.maxPointsHard;

    const timeSpent = (level2State.accumulatedTime + (Date.now() - level2State.startTime)) / 1000;

    let timeRatio = (level2State.timeRound - timeSpent) / level2State.timeRound;
    if(timeRatio < 0) timeRatio = 0;

    const finalPoints = Math.floor(basePoints * (0.5 + (timeRatio * 0.5)));
    return finalPoints;
};

function calculatePointsL3(completed) {

    if(!completed) return 0; // Si el jugador no completa el minijuego, no obtiene puntos
    
    let basePoints = 0;
    const diff = level3State.dificultad;

    if(diff === "fácil") basePoints = level3State.maxPointsEasy;
    else if(diff === "normal") basePoints = level3State.maxPointsNormal;
    else if(diff === "difícil") basePoints = level3State.maxPointsHard;

    const tiempoTotalInicial = 10;
    let timeRatio = level3State.timeRound / tiempoTotalInicial;

    if(timeRatio < 0) timeRatio = 0;
    if(timeRatio > 1) timeRatio = 1;

    const finalPoints = Math.floor(basePoints * (0.5 + (timeRatio * 0.5)));

    return finalPoints;
};

function calculatePointsL4() {

    const hintsShown = level4State.hintsShown;
    const identifier = "#helex-almacenado" + hintsShown;
    const helexAlmacenadoActual = document.querySelector(identifier);

    if(helexAlmacenadoActual) {
        const rawText = helexAlmacenadoActual.textContent;
        const onlyNumbers = rawText.replace(/\D/g, "");
        const finalPoints = parseInt(onlyNumbers, 10);
        return isNaN(finalPoints) ? 0 : finalPoints;

    }else {
        console.error("No se encontró el elemento de puntos para el ID: ", identifier);
        return 0;
    }
};

function checkGameOver() {
    switch (playingLevel) {
        case 1:
            if(level1State.lives <= 0) {
                return true;
            }else {
                return false;
            }
        break;

        case 2:
            if(level2State.lives <= 0) {
                return true;
            }else {
                return false;
            }
        break;

        case 3:
            if(level3State.lives <= 0) {
                return true;
            }else {
                return false;
            }
        break;

        case 4:
            if(level4State.lives <= 0) {
                return true;
            }else {
                return false;
            }
        break;
    
        default:
            break;
    }
};


// FIN DEL NIVEL
// -------------------------

function finishLevel(level) {
    console.log(`Nivel ${level} completado`);
    isPlayingLevel = false;
    hide(levelUI);

    if(level === 1) {
        AudioManager.stopMusic(musicLevel1);
    }else if(level === 3) {
        AudioManager.stopMusic(musicLevel3);
    }else if(level === 4) {
        AudioManager.stopMusic(musicLevel4);
    }
    
    completarNivel(playingLevel); // Se completa el nivel

    setTimeout(() => {
        levelUI.classList.remove("invisible");
        levelUI.classList.add("hidden");
        showUp(levelResumePage);
        showUp(levelCompletedVideo);
        levelCompletedVideo.currentTime = 0;
        playVideo(levelCompletedVideo, "/media/videos/level-completed.mp4"); // Se reproduce el vídeo de nivel completado
        AudioManager.playSound(levelCompletedSound);
    }, 600);

    setTimeout(() => {
        showUp(levelCompletedTxt);
    }, 800);
};

function endLevelNotFinished(level) {
    console.log(`Nivel ${level} finalizado sin completarse`);
    isPlayingLevel = false;

    hide(levelUI);

    if(level === 1) {
        AudioManager.stopMusic(musicLevel1);
    }else if(level === 3) {
        AudioManager.stopMusic(musicLevel3);
    }

    setTimeout(() => {
        levelUI.classList.remove("invisible");
        levelUI.classList.add("hidden");
    }, 600);
};

levelCompletedVideo.addEventListener("ended", () => { // Cuando termina el vídeo, aparece la pantalla de fin de nivel
    hide(levelCompletedVideo);
    hide(levelCompletedTxt);

    planetLevelEnded.classList.add("planet-appear"); // Preparamos las animaciones

    setTimeout(() => {
        levelCompletedVideo.classList.remove("invisible");
        levelCompletedVideo.classList.add("hidden");
        levelCompletedTxt.classList.remove("invisible");
        levelCompletedTxt.classList.add("hidden");
        showLevelResume();
    }, 1000);
});

function showLevelResume() { // Mostramos el resumen del nivel completado

    showUp(levelResumeVideo);
    levelResumeVideo.currentTime = 0;
    playVideo(levelResumeVideo, "/media/videos/level-completed-resume.mp4");

    switch (playingLevel) {  // Actualizamos los récords personales
        case 1:
            tryRecord = updateRecords(playingLevel, level1State.dificultad, level1State.score);
            break;

        case 2:
            tryRecord = updateRecords(playingLevel, level2State.dificultad, level2State.score);
            break;

        case 3:
            tryRecord = updateRecords(playingLevel, level3State.dificultad, level3State.score);
            break;

        case 4:
            tryRecord = updateRecords(playingLevel, level4State.dificultad, level4State.score);
            break;
    
        default:
            break;
    }

    AudioManager.playMusic(levelResumeMusic);

    fillLevelData(); // Rellenamos los resultados del nivel
    updateFinalLevelBar();

    setTimeout(() => {
        openedResumePage = true;
        showUp(levelCompletedDetails); // Aparecen los resultados del nivel

        let delay = 0;
        const gapBetweenLines = 150; // Tiempo entre que aparece una línea y la siguiente

        txtsAppear.forEach((txt, index) => {
    
            txt.style.opacity = 0;

            setTimeout(() => {
                txt.style.opacity = 1;
            }, delay);

            setTimeout(() => {
                txt.style.opacity = 0;
            }, delay + 80);

            setTimeout(() => {
                txt.style.opacity = 1;
            }, delay + 120);

            setTimeout(() => {
                txt.style.opacity = 0.5;
            }, delay + 180);

            setTimeout(() => {
                txt.style.opacity = 1;
            }, delay + 250);

            delay += gapBetweenLines;
        });

        planetLevelEnded.classList.remove("planet-appear");

    }, 400);

    setTimeout(() => {
        if(tryRecord.newRecord) { // Si ha habido un nuevo récord
            scoreOrRecord.textContent = "¡Nuevo récord!";
            AudioManager.playSound(newRecordSound);
            AudioManager.playSound(newRecordVoiceSound);
        }
    }, 1000);
};

function updateRecords(level, difficult, score) {

    const levelKey = `level${level}`;

    if(!gameState.highScores[levelKey]) { // Reseteamos los valores si no hay
        gameState.highScores[levelKey] = {
            "fácil": 0,
            "normal": 0,
            "difícil": 0
        };
    }

    let actualRecord = gameState.highScores[levelKey][difficult];

    if(score > actualRecord) { // Ha habido un nuevo récord
        gameState.highScores[levelKey][difficult] = score;
        console.log(`¡Nuevo récord en ${levelKey} (${difficult})!: ${score}`);
        return {
            newRecord: true,
            actualRecord: actualRecord
        };
    }

    return { // No ha habido un nuevo récord
        newRecord: false,
        actualRecord: actualRecord
    }
};

function getBestRecord(level) {
    
    const levelKey = `level${level}`;
    const scores = gameState.highScores ? gameState.highScores[levelKey] : null;

    if(!scores) return { difficult: "normal", score: 0 }

    const difficultWeight = {
        "fácil": 1,
        "normal": 2,
        "difícil": 3
    };

    let best = { difficult: "fácil", score: 0 };

    Object.keys(scores).forEach(currentDiff => {
        const currentScore = scores[currentDiff] || 0; // Si es null, tratamos como 0

        const isHigherScore = currentScore > best.score;
        const isEqualButHarder = (currentScore === best.score && difficultWeight[currentDiff] > (difficultWeight[best.difficult] || 0));

        if (isHigherScore || isEqualButHarder) {
            best = {
                difficult: currentDiff,
                score: currentScore
            };
        }
    });

    return best;
};

function fillLevelData() {

    let playingDificultad = null;
    const best = getBestRecord(playingLevel);

    switch (playingLevel) {
        case 1:

            if(level1State.dificultad === "fácil") {
                playingDificultad = "fácil";
                levelDifficultResume.style.color = "greenyellow";
                
            }else if(level1State.dificultad === "normal") {
                playingDificultad = "normal";
                levelDifficultResume.style.color = "yellow";

            }else if(level1State.dificultad === "difícil") {
                playingDificultad = "difícil";
                levelDifficultResume.style.color = "red";
            }

            levelDifficultResume.textContent = `Dificultad ${playingDificultad}`;
            infoDataStats1.textContent = "Aciertos: ";
            infoDataStats2.textContent = "Errores: ";
            infoData1.textContent = level1State.correctRounds;
            infoData2.textContent = level1State.incorrectRounds;
            finalScore.textContent = level1State.score;
            planetLevelEnded.src = "/media/img/planets/planet8.png";
            break;

        case 2:

            if(level2State.dificultad === "fácil") {
                playingDificultad = "fácil";
                levelDifficultResume.style.color = "greenyellow";

            }else if(level2State.dificultad === "normal") {
                playingDificultad = "normal";
                levelDifficultResume.style.color = "yellow";

            }else if(level2State.dificultad === "difícil") {
                playingDificultad = "difícil";
                levelDifficultResume.style.color = "red";
            }

            levelDifficultResume.textContent = `Dificultad ${playingDificultad}`;
            infoDataStats1.textContent = "Aciertos: ";
            infoDataStats2.textContent = "Errores: ";
            infoData1.textContent = level2State.correctRounds;
            infoData2.textContent = level2State.incorrectRounds;
            finalScore.textContent = level2State.score;
            planetLevelEnded.src = "/media/img/planets/planet7.png";
            break;

        case 3:

            if(level3State.dificultad === "fácil") {
                playingDificultad = "fácil";
                levelDifficultResume.style.color = "greenyellow";

            }else if(level3State.dificultad === "normal") {
                playingDificultad = "normal";
                levelDifficultResume.style.color = "yellow";

            }else if(level3State.dificultad === "difícil") {
                playingDificultad = "difícil";
                levelDifficultResume.style.color = "red";
            }

            levelDifficultResume.textContent = `Dificultad ${playingDificultad}`;
            infoDataStats1.textContent = "Aciertos: ";
            infoDataStats2.textContent = "Errores: ";
            infoData1.textContent = level3State.correctRounds;
            infoData2.textContent = level3State.incorrectRounds;
            finalScore.textContent = level3State.score;
            planetLevelEnded.src = "/media/img/planets/planet6.png";
            break;

        case 4:

            if(level4State.dificultad === "fácil") {
                playingDificultad = "fácil";
                levelDifficultResume.style.color = "greenyellow";

            }else if(level4State.dificultad === "normal") {
                playingDificultad = "normal";
                levelDifficultResume.style.color = "yellow";

            }else if(level4State.dificultad === "difícil") {
                playingDificultad = "difícil";
                levelDifficultResume.style.color = "red";
            }

            levelDifficultResume.textContent = `Dificultad ${playingDificultad}`;
            infoDataStats1.textContent = "Aciertos: ";
            infoDataStats2.textContent = "Errores: ";
            infoData1.textContent = level4State.correctRounds;
            infoData2.textContent = level4State.incorrectRounds;
            finalScore.textContent = level4State.score;
            planetLevelEnded.src = "/media/img/planets/planet5.png";
            break;
    
        default:
            break;
    }

    recordDificultadTxt.textContent = `Dificultad ${best.difficult}`;

    if(best.difficult === "fácil") {
        recordDificultadTxt.style.color = "greenyellow";
    }else if(best.difficult === "normal") {
        recordDificultadTxt.style.color = "yellow";
    }else if(best.difficult === "difícil") {
        recordDificultadTxt.style.color = "red";
    }

    recordDificultadNumber.textContent = best.score;
    levelCompletedTxtResume.textContent = `Nivel ${playingLevel} completado`;

};

// Cuando se completa un nivel

function completarNivel(levelId) { 

    if(!gameState.nivelesCompletos.includes(levelId)) {

        gameState.nivelesCompletos.push(levelId); // Se añade el nivel actual a la carpeta de niveles completos
    }

    if(levelId === gameState.nivelActual && levelId < totalLevels) { // Si ha completado el último nivel disponible
        gameState.nivelActual++; // Desbloquea un nuevo nivel
        gameState.newLevelUnlocked = true; // Se notificará al usuario que ha desbloqueado un nuevo nivel
    }
};

closeInfoLevel.addEventListener("click", () => {
    if(openedResumePage) {

        AudioManager.playSound(selectSound);
        AudioManager.stopMusic(levelResumeMusic);
    
        saveGameState(); // Se guarda la partida
        resetLevel(playingLevel); // Se resetea el nivel
        resetGameAfterLevel(); // Se resetea el juego para volver al menú principal

        hide(levelResumePage);

        setTimeout(() => {
            levelResumePage.classList.remove("invisible");
            levelResumePage.classList.add("hidden");

            if(gameState.playerScore >= helexGoal) {
                iniciarFinDelJuego();
            }else {
                iniciarMenuPrincipal();
            }
        }, 1000);
    }
});

function iniciarFinDelJuego() {
    endGameVideo.classList.remove("hidden");

    setTimeout(() => {
        AudioManager.playMusic(endGameCinematicMusic, {loop: false});
        endGameVideo.currentTime = 0;
        playVideo(endGameVideo, "/media/videos/end-game.mp4");
        show(endGameVideo);
    }, 50);

    setTimeout(() => {
        showUp(endGameVictory);
    }, 8500);

    endGameVideo.addEventListener("ended", () => {
        endGameVideo.pause();
        hide(endGameVideo);
        hide(endGameVictory);

        AudioManager.stopMusic(endGameCinematicMusic);

        setTimeout(() => {
            endGameVideo.classList.add("hidden");
            endGameVictory.classList.add("hidden");
            endGameVictory.classList.remove("invisible");
            goToCredits();
        }, 1000);
    }, {once: true});
};

function goToCredits() {
    creditCount = 0;

    setTimeout(() => {
        creditsVideo.classList.remove("hidden");
        creditsPage.classList.remove("hidden");

        AudioManager.playMusic(creditsMusic);
        
        creditsTxts.forEach(txt => {
            txt.classList.add("hidden", "invisible");
        });
    }, 1000);

    setTimeout(() => {
        show(creditsVideo);
        show(creditsPage);
        creditsVideo.currentTime = 0;
        playVideo(creditsVideo, "/media/videos/credits-video.mp4");

        startCredits(); // Iniciamos los créditos finales
        nextCredit(); // Mostramos el primer crédito
    }, 1050);
};

function startCredits() {
    creditsInterval = setInterval(() => {
        nextCredit();
    }, 6000);
}

function nextCredit() {

    // Quitamos el crédito anterior
    creditsTxts.forEach(txt => {
        if(txt.classList.contains("active")) {

            hide(txt);
            txt.classList.remove("active")

            setTimeout(() => {
                txt.classList.add("hidden");
            }, 1000);
        }
    });

    setTimeout(() => {
        // Activamos el nuevo crédito (si quedan)
        creditsTxts[creditCount].classList.add("active");
    
        creditsTxts.forEach(txt => {
            if(txt.classList.contains("active")) {
                txt.classList.remove("hidden");
    
                setTimeout(() => {
                    show(txt);
                }, 50);
            }
        });

        creditCount++;

        if(creditCount >= creditsTxts.length) { // Si no quedan créditos, finalizan los créditos
            setTimeout(() => {
                clearInterval(creditsInterval);
                creditCount = 0;
                closeCredits();
                return;
            }, 4000); 
        }
    }, 1100);
};

function closeCredits() { // Al finalizar los créditos, se vuelve al menú principal

    creditsTxts.forEach(txt => {
        if(txt.classList.contains("active")) {

            hide(txt);
            hide(creditsVideo);
            hide(creditsPage);
            txt.classList.remove("active")

            setTimeout(() => {
                txt.classList.add("hidden");
            }, 1000);
        }
    });

    setTimeout(() => {
        creditsVideo.pause();
        creditsVideo.currentTime = 0;
        creditsVideo.classList.add("hidden");
        creditsPage.classList.add("hidden");
    }, 1000);

    setTimeout(() => {
        resetMenuPrincipal();
        gameState.freeModeAfterWinning = true;
        saveGameState();
        iniciarMenuPrincipal();
    }, 2000);
};

function resetLevel(level) {

    switch (level) {
        case 1:

            if (level1State.sequenceTimeouts) {
                level1State.sequenceTimeouts.forEach(t => clearTimeout(t));
            }

            level1State = {
                sequenceTimeouts: [],
                sequence: [],
                playerIndex: 0,
                round: 0,
                speed: 1000,
                isShowingSequence: false,
                readyforSequence: false,
                score: 0,
                maxRounds: 10,
                maxPointsEasy: 5,
                maxPointsNormal: 10,
                maxPointsHard: 20, 
                lives: 3,
                correctRounds: 0,
                incorrectRounds: 0,
                dificultad: "normal",
                wasShowingSequence: false,
                wasBlocked: false,
                isTransitioningByW: false
            };

            puntuacionActual.textContent = 0;

            monsters.forEach((monster) => {
                monster.classList.remove("byw-monster");
            });
        break;

        case 2:

            if (level2State.audioPlayer) {
                level2State.audioPlayer.pause();
                level2State.audioPlayer.src = "";
                level2State.audioPlayer.onended = null;
            }

            clearLevel2Timeouts(); 
            if (level2State.warningTimer) clearTimeout(level2State.warningTimer);
            if (level2State.timer) clearTimeout(level2State.timer);

            level2State = {
                musicPlaylist: [],
                blockedButtons: false,
                round: 0,
                currentSongIndex: 0,
                timer: null,
                warningTimer: null,
                timeRemaining: 0,
                pauseTimestamp: 0,
                isMusicPlaying: false,
                startTime: null,
                audioPlayer: new Audio(),
                timeRound: 5,
                score: 0, 
                maxRounds: 5, 
                maxPointsEasy: 10, 
                maxPointsNormal: 20, 
                maxPointsHard: 30, 
                lives: 3, 
                correctRounds: 0,
                incorrectRounds: 0,
                dificultad: "normal",
                accumulatedTime: 0,
                feedbackTimeouts: [], 
                timeouts: new Set(),
                wasBlocked: false
            };

            document.getElementById('songs-option-container').innerHTML = '';
            infoSongContainer.classList.add("hidden"); 
            audioWaveLevel2Container.classList.add("hidden");
            timeContainer.classList.add("hidden");
            timeBar.style.width = "100%";
            timeBar.classList.remove("low-time");
        break;

        case 3:
            level3State = {
                miniGamesArray: [],
                blockedButtons: true,
                round: 0,
                timeRound: 10,
                score: 0,
                maxRounds: 5,
                maxPointsEasy: 10, 
                maxPointsNormal: 20,
                maxPointsHard: 30, 
                lives: 3,
                correctRounds: 0,
                incorrectRounds: 0,
                dificultad: "normal",
                canWinFuel: false,
                speedCounter: 0,
                isPressing: false,
                gameLoopId: null,
                aceleracion: 1.5,
                deceleracion: 0.8,
                limiteInferior: 200,
                limiteSuperior: 300,
                progress: 0,
                progressSpeed: 0.3,
                timerRunning: false,
                roundEnded: false,
                glitchInterval: null,
                currentlyTappingIndex: null,
                lastFrameTime: 0,
                intentosFallidosObligatorios: 0,
                margenError: 2,
                inclinacionActual: 0,
                inclinacionObjetivo: 0,
                rotationInterval: null,
                manchasRestantes: 0,
                toquesPorMancha: 3,
                assetsManchas: [
                    "media/img/level3/cafe.png",
                    "media/img/level3/nintendo.png",
                    "media/img/level3/galleta.png",
                    "media/img/level3/zapatilla.png",
                    "media/img/level3/mosca.png",
                    "media/img/level3/papel.png",
                    "media/img/level3/libro.png",
                    "media/img/level3/gafas.png",
                    "media/img/level3/microfono.png",
                    "media/img/level3/pescado.png",
                    "media/img/level3/cubo-rubik.png",
                    "media/img/level3/disco-musica.png",
                ]
            };
        break;

        case 4:
            level4State = {
                wordSet: [],
                currentWordIndex: 0,
                hintsShown: 0,
                round: 0,
                isShowingHint: false,
                readyforAnswer: false,
                score: 0,
                maxRounds: 5,
                maxPointsEasy: 20,
                maxPointsNormal: 40,
                maxPointsHard: 50,
                lives: 3,
                correctRounds: 0,
                incorrectRounds: 0,
                dificultad: "normal",
                blockedButtons: true,
                feedbackTimeouts: [], 
                activeTimeouts: [],
                wasBlocked: false
            };

            userMessageInput.value = ""; // Vaciamos la respuesta
            userMessageInput.classList.remove("correct", "incorrect"); // Quitamos los colores destacados


        break;
    
        default:
            break;
    }
};

function resetGameAfterLevel() {

    // Reiniciar variables
    openedAjustes = false;
    openedNiveles = false;
    openedLevelInstructions = false;
    openedHeleaState = false;
    openedStoryMenu = false;
    openedResumePage = false;
    openedWarning = false;
    openedHeleaStoryPage = false;

    isPlayingLevel = false;
    levelIntroEnded = false;
    gameOver = false;
    selectingDifficult = false;
    selectedLevel = false;
    runningAnimation = false;
    levelPaused = false;
    tryRecord = {};

    feedbackMessage = 0;
    tryRecord = {};
    playingLevel = null;
    levelColor = null;
    difficultSelected = null;

    dialogoIndex = 1;
    escribiendo = false;
    currentStep = 0;
    storyStepCount = 1;
    endGameStepCount = 1;
    creditCount = 0;

    // Reiniciar puntos del nivel
    puntosGanados.textContent = 0;
    puntuacionActual.textContent = 0;

    // Reiniciar elementos del menú principal
    mainMenuRight.classList.remove("go-bottom");
    mainHeader.classList.remove("reduct-margintop");

    // Reiniciar elementos del mapa de niveles
    levelSelectedUI.classList.remove("flow");
    levelSelectedUI.style.justifyContent = "center";
    levelSelectedUI.style.top = "0";
    levelSelectedUI.style.bottom = "0";

    level1Game.style.backgroundImage = "";
    level2Game.style.backgroundImage = "";
    level3Game.style.backgroundImage = "";
    level4Game.style.backgroundImage = "";

    // Reiniciar elementos de la carga de nivel
    hideUp(headerLevel);
    levelSelectDifficult.classList.add("hidden");
    loadingLevelPage.classList.remove("level1");
    loadingLevelPage.classList.remove("level2");
    loadingLevelPage.classList.remove("level3");
    loadingLevelPage.classList.remove("level4");

    // Añadir aquí el resto de páginas de los niveles

    musicLevel1.playbackRate = 1;
    musicLevel3.playbackRate = 1;
    musicLevel4.playbackRate = 1;
    // Añadir aquí el resto de música de los niveles

    hideUp(levelResumeVideo);
    hideUp(levelCompletedDetails);
    countDownLv3.classList.add("hidden");

    if (lightEffectsInterval) {
        clearInterval(lightEffectsInterval);
        lightEffectsInterval = null;
    }

    lightTimeouts.forEach(timeout => clearTimeout(timeout));
    lightTimeouts = [];

    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }

    difficultButtons.forEach(btn => {
        btn.classList.remove("active");
    })

    vidas.forEach(vida => {
        showUp(vida);
    })

    if (activeWaveIntervals["level2"]) {
        clearInterval(activeWaveIntervals["level2"]);
        delete activeWaveIntervals["level2"];
    }

    const songOptions = document.getElementById('songs-option-container');
    if (songOptions) songOptions.innerHTML = '';

    infoSongContainer.classList.add("hidden");
    audioWaveLevel2Container.classList.add("hidden");

    songName.textContent = "";
    songArtist.textContent = "";

    countDownLv3.textContent = level3State.timeRound;
};

// MODO TESTER (CHEATS)
// ---------------------------------------------------

// Completar el juego --> Lanzar la pantalla final

function testEndGame(isActive) { 
    if(isActive) {
        gameState.playerScore = 50000;
    }
};