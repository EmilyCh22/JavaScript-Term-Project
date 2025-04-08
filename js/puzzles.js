$(document).ready(function () {
  document.getElementById("goHome").addEventListener("click", function () {
    window.location.href = "https://lisabalbach.com/cherka3/CIT190/FinalProject/gameHomepage.html"
  })

  var snapTolerance = 20;
  var shuffledPieces;

  $(".selectImage").on("click", function () {
    var imageURL = $(this).attr("src");
    var image = new Image();
    image.src = imageURL;

    image.onload = function () {
      var pieceCount = parseInt($("#pieceCount").val());
      var pieces = splitImageIntoPieces(image, pieceCount);
      shuffledPieces = shuffleArray(pieces);
      displayPuzzlePieces(shuffledPieces);
      makePiecesDraggable();
    };
  });

  $("#pieceCount").on("change", function () {
    if (shuffledPieces) {
      var pieceCount = parseInt($(this).val());
      var pieces = splitImageIntoPieces(shuffledPieces[0].image, pieceCount);
      shuffledPieces = shuffleArray(pieces);
      displayPuzzlePieces(shuffledPieces);
      makePiecesDraggable();
    }
  })

  function splitImageIntoPieces(image, pieceCount) {
    var pieceWidth = image.width / Math.sqrt(pieceCount);
    var pieceHeight = image.height / Math.sqrt(pieceCount);
    var pieces = [];

    for (var y = 0; y < Math.sqrt(pieceCount); y++) {
      for (var x = 0; x < Math.sqrt(pieceCount); x++) {
        var canvas = document.createElement('canvas');
        canvas.width = pieceWidth;
        canvas.height = pieceHeight;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
        $("image").data(image, x);
        pieces.push({ src: canvas.toDataURL(), left: 0, top: 0, image: image });
      }
    }
    return pieces;
  }

  function displayPuzzlePieces(pieces) {
    var puzzleContainer = $("#puzzleContainer");
    puzzleContainer.empty();
    pieces.forEach(function (piece, index) {
      var puzzlePiece = $("<div class='puzzlePiece'></div>");
      puzzlePiece.css({
        'background-image': 'url(' + piece.src + ')',
        'width': 'calc(100% / ' + Math.sqrt(pieces.length) + ')',
        'height': 'calc(100% / ' + Math.sqrt(pieces.length) + ')',
        'background-size': 'cover',
        'left': piece.left,
        'top': piece.top
      });
      puzzlePiece.data('index', index);
      puzzleContainer.append(puzzlePiece);
    });
  }

  function makePiecesDraggable() {
    $(".puzzlePiece").draggable({
      containment: '#puzzleContainer',
      snap: true,
      snapMode: 'inner',
      snapTolerance: snapTolerance,

      // Ensures proper behavior for touchscreens
      start: function(event, ui) {
        if (event.type === "touchstart") {
          $(this).css("opacity", "0.7");
        }
      },
      
      stop: function (event, ui) {
        var index = $(this).data('index');
        var cellWidth = $(this).parent().width() / Math.sqrt(shuffledPieces.length);
        var cellHeight = $(this).parent().height() / Math.sqrt(shuffledPieces.length);
        var newX = Math.round(ui.position.left / cellWidth) * cellWidth;
        var newY = Math.round(ui.position.top / cellHeight) * cellHeight;
        $(this).css({ 'left': newX, 'top': newY, "opacity":"1" });
        shuffledPieces[index].left = newX;
        shuffledPieces[index].top = newY;
      }
    });
  }

  function shuffleArray(array) {
    var currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }
})