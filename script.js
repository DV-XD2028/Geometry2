document.querySelectorAll('.lesson-btn').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 500);
    });
});

function showMenu(menuNumber) {
    document.getElementById('main-menu').style.display = 'none';

    document.getElementById(`menu-${menuNumber}`).style.display = 'flex';
}

function showMainMenu() {
    document.querySelectorAll('.submenu').forEach(menu => {
        menu.style.display = 'none';
    });

    document.getElementById('main-menu').style.display = 'flex';
}

function goBackToMenu1() {
    document.getElementById('proof-section').style.display = 'none';
    document.getElementById('menu-1').style.display = 'flex';
}

function typeText(element, text, speed = 50) {
    element.innerHTML = '';
    let index = 0;

    const lines = text.split('<br>');
    let lineIndex = 0;

    function type() {
        if (lineIndex < lines.length) {
            const line = lines[lineIndex];
            if (index < line.length) {

                element.innerHTML += line[index];
                index++;
                setTimeout(type, speed);
            } else {
                element.innerHTML += '<br>';
                lineIndex++;
                index = 0;
                setTimeout(type, speed);
            }
        }
    }

    type();
}

function drawCentralAngle() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    let angleA, angleB;
    do {
        angleA = Math.random() * Math.PI * 2;
        angleB = Math.random() * Math.PI * 2;
    } while (Math.abs(angleA - angleB) < 0.5);

    const ax = centerX + radius * Math.cos(angleA);
    const ay = centerY + radius * Math.sin(angleA);
    const bx = centerX + radius * Math.cos(angleB);
    const by = centerY + radius * Math.sin(angleB);

    let circleProgress = 0;
    function drawCircle() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, circleProgress * 2 * Math.PI * 2);
        ctx.stroke();
        circleProgress += 0.01;
        if (circleProgress <= 1) {
            requestAnimationFrame(drawCircle);
        } else {
            drawRadiusA();
        }
    }

    let radiusAProgress = 0;
    function drawRadiusA() {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + radiusAProgress * (ax - centerX), centerY + radiusAProgress * (ay - centerY));
        ctx.stroke();
        radiusAProgress += 0.02;
        if (radiusAProgress <= 1) {
            requestAnimationFrame(drawRadiusA);
        } else {
            drawRadiusB();
        }
    }

    let radiusBProgress = 0;
    function drawRadiusB() {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + radiusBProgress * (bx - centerX), centerY + radiusBProgress * (by - centerY));
        ctx.stroke();
        radiusBProgress += 0.02;
        if (radiusBProgress <= 1) {
            requestAnimationFrame(drawRadiusB);
        } else {
            labelPoints();
        }
    }

    function labelPoints() {
        ctx.fillStyle = '#ff8000';
        ctx.font = '20px Estedad';
        ctx.fillText('O', centerX - 10, centerY - 10);
        ctx.fillText('A', ax + 10, ay + 10);
        ctx.fillText('B', bx + 10, by + 10);
            ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff8000';
        ctx.fill();
        const proof = document.getElementById('proof');
        const text = '∠O = AB';
        typeText(proof, text, 50);
    }


    drawCircle();
}

function showCentralAngle() {
    document.getElementById('menu-1').style.display = 'none';
    document.getElementById('proof-section').style.display = 'block';
    document.getElementById('proof').innerHTML = '';

    drawCentralAngle();
}

function showInscribedAngle() {
    document.getElementById('menu-1').style.display = 'none';
    document.getElementById('proof-section').style.display = 'block';
    document.getElementById('proof').innerHTML = '';

    drawInscribedAngle();
}

function drawInscribedAngle() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    const angleM = Math.random() * Math.PI * 2;
    const minAngleDifference = Math.PI / 2;
    let angleA = angleM + Math.random() * (Math.PI - minAngleDifference) + minAngleDifference;
    let angleB = angleM - Math.random() * (Math.PI - minAngleDifference) - minAngleDifference;

    const Mx = centerX + radius * Math.cos(angleM);
    const My = centerY + radius * Math.sin(angleM);
    const Ax = centerX + radius * Math.cos(angleA);
    const Ay = centerY + radius * Math.sin(angleA);
    const Bx = centerX + radius * Math.cos(angleB);
    const By = centerY + radius * Math.sin(angleB);

    let circleProgress = 0;

    function drawCircle() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, circleProgress * 3 * Math.PI);
        ctx.stroke();
        circleProgress += 0.01;
        if (circleProgress <= 1) {
            requestAnimationFrame(drawCircle);
        } else {
            drawLineMA();
        }
    }

    let lineMAProgress = 0;

    function drawLineMA() {
        ctx.beginPath();
        ctx.moveTo(Mx, My);
        ctx.lineTo(Mx + lineMAProgress * (Ax - Mx), My + lineMAProgress * (Ay - My));
        ctx.stroke();
        lineMAProgress += 0.02;
        if (lineMAProgress <= 1) {
            requestAnimationFrame(drawLineMA);
        } else {
            drawLineMB();
        }
    }

    let lineMBProgress = 0;

    function drawLineMB() {
        ctx.beginPath();
        ctx.moveTo(Mx, My);
        ctx.lineTo(Mx + lineMBProgress * (Bx - Mx), My + lineMBProgress * (By - My));
        ctx.stroke();
        lineMBProgress += 0.02;
        if (lineMBProgress <= 1) {
            requestAnimationFrame(drawLineMB);
        } else {
            labelPoints();
        }
    }

    function labelPoints() {
        ctx.fillStyle = '#ff8000';
        ctx.font = '20px Estedad';
        ctx.fillText('M', Mx + 10, My + 10);
        ctx.fillText('A', Ax + 10, Ay + 10);
        ctx.fillText('B', Bx + 10, By + 10);

        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff8000';
        ctx.fill();
        ctx.fillText('O', centerX - 10, centerY - 10);

        const proof = document.getElementById('proof');
        const text = '∠M = AB/2';
        typeText(proof, text, 50);
    }

    drawCircle();
}

function showTangentAngle() {
    document.getElementById('menu-1').style.display = 'none';
    document.getElementById('proof-section').style.display = 'block';
    document.getElementById('proof').innerHTML = '';

    drawTangentAngle();
}

function drawTangentAngle() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    let angleN = Math.random() * Math.PI * 2;
    let angleA;
    const minAngleDifference = Math.PI / 6;

    const minDistance = radius * Math.sin(minAngleDifference);

    do {
        angleA = Math.random() * Math.PI * 2;
    } while (Math.abs(angleA - angleN) < minAngleDifference ||
             distanceBetweenAngles(angleA, angleN, radius) < minDistance);

    const Nx = centerX + radius * Math.cos(angleN);
    const Ny = centerY + radius * Math.sin(angleN);
    const Ax = centerX + radius * Math.cos(angleA);
    const Ay = centerY + radius * Math.sin(angleA);

    let circleProgress = 0;

    function drawCircle() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, circleProgress * 3 * Math.PI);
        ctx.stroke();
        circleProgress += 0.01;
        if (circleProgress <= 1) {
            requestAnimationFrame(drawCircle);
        } else {
            drawLineNA();
        }
    }

    let lineNAProgress = 0;

    function drawLineNA() {
        ctx.beginPath();
        ctx.moveTo(Nx, Ny);
        ctx.lineTo(Nx + lineNAProgress * (Ax - Nx), Ny + lineNAProgress * (Ay - Ny));
        ctx.stroke();
        lineNAProgress += 0.02;
        if (lineNAProgress <= 1) {
            requestAnimationFrame(drawLineNA);
        } else {
            drawTangentAtN();
        }
    }

    let tangentProgress = 0;

    function drawTangentAtN() {
        const tangentSlope = -(Nx - centerX) / (Ny - centerY);
        const tangentLength = 200;

        const Tx1 = Nx - tangentLength * Math.cos(Math.atan(tangentSlope));
        const Ty1 = Ny - tangentLength * Math.sin(Math.atan(tangentSlope));
        const Tx2 = Nx + tangentLength * Math.cos(Math.atan(tangentSlope));
        const Ty2 = Ny + tangentLength * Math.sin(Math.atan(tangentSlope));

        ctx.beginPath();
        ctx.moveTo(Tx1, Ty1);
        ctx.lineTo(Tx1 + tangentProgress * (Tx2 - Tx1), Ty1 + tangentProgress * (Ty2 - Ty1));
        ctx.stroke();
        tangentProgress += 0.02;
        if (tangentProgress <= 1) {
            requestAnimationFrame(drawTangentAtN);
        } else {
            labelPoints();
        }
    }

    function labelPoints() {
        ctx.fillStyle = '#ff8000';
        ctx.font = '20px Estedad';
        ctx.fillText('N', Nx + 10, Ny + 10);
        ctx.fillText('A', Ax + 10, Ay + 10);

        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff8000';
        ctx.fill();
        ctx.fillText('O', centerX - 10, centerY - 10);

        const proof = document.getElementById('proof');
        const text = '∠N = AN/2';
        typeText(proof, text, 50);
    }

    function distanceBetweenAngles(angle1, angle2, radius) {
        const x1 = radius * Math.cos(angle1);
        const y1 = radius * Math.sin(angle1);
        const x2 = radius * Math.cos(angle2);
        const y2 = radius * Math.sin(angle2);
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    drawCircle();
}

function showInternalAngle() {
    document.getElementById('menu-1').style.display = 'none';
    document.getElementById('proof-section').style.display = 'block';
    document.getElementById('proof').innerHTML = '';

    drawInternalAngle();
}

function drawInternalAngle() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    const angleA = Math.random() * Math.PI * 2;
    const angleC = angleA + Math.PI;
    const minDistanceFromCenter = Math.PI / 4;

    let angleB = angleA + minDistanceFromCenter + (Math.random() * Math.PI / 3);
    if (angleB >= 2 * Math.PI) angleB -= 2 * Math.PI;

    let angleD = angleC + minDistanceFromCenter + (Math.random() * Math.PI / 3);
    if (angleD >= 2 * Math.PI) angleD -= 2 * Math.PI;

    const Ax = centerX + radius * Math.cos(angleA);
    const Ay = centerY + radius * Math.sin(angleA);
    const Bx = centerX + radius * Math.cos(angleB);
    const By = centerY + radius * Math.sin(angleB);
    const Cx = centerX + radius * Math.cos(angleC);
    const Cy = centerY + radius * Math.sin(angleC);
    const Dx = centerX + radius * Math.cos(angleD);
    const Dy = centerY + radius * Math.sin(angleD);

    let circleProgress = 0;

    function drawCircle() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, circleProgress * 3 * Math.PI);
        ctx.stroke();
        circleProgress += 0.01;
        if (circleProgress <= 1) {
            requestAnimationFrame(drawCircle);
        } else {
            drawLineAC();
        }
    }

    let lineACProgress = 0;

    function drawLineAC() {
        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Ax + lineACProgress * (Cx - Ax), Ay + lineACProgress * (Cy - Ay));
        ctx.stroke();
        lineACProgress += 0.02;
        if (lineACProgress <= 1) {
            requestAnimationFrame(drawLineAC);
        } else {
            drawLineBD();
        }
    }

    let lineBDProgress = 0;

    function drawLineBD() {
        ctx.beginPath();
        ctx.moveTo(Bx, By);
        ctx.lineTo(Bx + lineBDProgress * (Dx - Bx), By + lineBDProgress * (Dy - By));
        ctx.stroke();
        lineBDProgress += 0.02;
        if (lineBDProgress <= 1) {
            requestAnimationFrame(drawLineBD);
        } else {
            drawIntersectionAndLabel();
        }
    }

    function drawIntersectionAndLabel() {
        const denominator = (Ax - Cx) * (By - Dy) - (Ay - Cy) * (Bx - Dx);
        if (denominator !== 0) {
            const t = ((Ax - Dx) * (By - Dy) - (Ay - Dy) * (Bx - Dx)) / denominator;
            const intersectionX = Ax + t * (Cx - Ax);
            const intersectionY = Ay + t * (Cy - Ay);

            ctx.beginPath();
            ctx.arc(intersectionX, intersectionY, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#ff8000';
            ctx.fill();
            ctx.fillText('P', intersectionX + 10, intersectionY + 10);

            ctx.fillStyle = '#ff8000';
            ctx.font = '20px Estedad';
            ctx.fillText('A', Ax + 10, Ay + 10);
            ctx.fillText('B', Bx + 10, By + 10);
            ctx.fillText('C', Cx + 10, Cy + 10);
            ctx.fillText('D', Dx + 10, Dy + 10);

            ctx.beginPath();
            ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#ff8000';
            ctx.fill();
            ctx.fillText('O', centerX - 10, centerY - 10);

            const proof = document.getElementById('proof');
            const text = `∠P1 = (AB + CD) / 2<br>∠P2 = (BC + AD) / 2`;
            typeText(proof, text, 50);
        }
    }

    drawCircle();
}

function showExternalAngle() {
    document.getElementById('menu-1').style.display = 'none';
    document.getElementById('proof-section').style.display = 'block';
    document.getElementById('proof').innerHTML = '';

    drawExternalAngle();
}

function drawExternalAngle() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    let Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, intersection;
    let attempts = 0;

    do {
        let angleA = Math.random() * Math.PI;
        let angleB;
        do {
            angleB = angleA + Math.random() * (Math.PI / 5);
        } while (Math.abs(angleB - angleA) < Math.PI / 10);

        Ax = centerX + radius * Math.cos(angleA);
        Ay = centerY + radius * Math.sin(angleA);
        Bx = centerX + radius * Math.cos(angleB);
        By = centerY + radius * Math.sin(angleB);

        let externalAngle = Math.random() * (Math.PI / 2);

        let innerAttempts = 0;
        do {
            if (innerAttempts > 10) {
                break;
            }

            const angleC = angleA + Math.PI + externalAngle;
            const angleD = angleB + Math.PI - externalAngle;

            Cx = centerX + radius * Math.cos(angleC);
            Cy = centerY + radius * Math.sin(angleC);
            Dx = centerX + radius * Math.cos(angleD);
            Dy = centerY + radius * Math.sin(angleD);

            const extendedLength = 300;
            const Gx = Ax + extendedLength * (Ax - Cx);
            const Gy = Ay + extendedLength * (Ay - Cy);
            const Hx = Bx + extendedLength * (Bx - Dx);
            const Hy = By + extendedLength * (By - Dy);

            intersection = getLineIntersection(Ax, Ay, Gx, Gy, Bx, By, Hx, Hy);
            innerAttempts++;
        } while (intersection && Math.hypot(intersection.x - centerX, intersection.y - centerY) < radius);

        if (intersection && Math.hypot(intersection.x - centerX, intersection.y - centerY) >= radius) {
            break;
        }

        attempts++;
        if (attempts > 30) {
            console.error('Unable to find valid points after many attempts.');
            return;
        }
    } while (true);

    let circleProgress = 0;

    function drawCircle() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, circleProgress * 3 * Math.PI);
        ctx.stroke();
        circleProgress += 0.01;
        if (circleProgress <= 1) {
            requestAnimationFrame(drawCircle);
        } else {
            drawLines();
        }
    }

    let lineProgress = 0;

    function drawLines() {
        ctx.strokeStyle = '#ff8000';
        ctx.beginPath();
        ctx.moveTo(Cx, Cy);
        ctx.lineTo(Cx + lineProgress * (Ax - Cx), Cy + lineProgress * (Ay - Cy));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(Bx, By);
        ctx.lineTo(Bx + lineProgress * (Dx - Bx), By + lineProgress * (Dy - By));
        ctx.stroke();

        ctx.strokeStyle = '#ff8000';
        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Ax + 300 * (Ax - Cx), Ay + 300 * (Ay - Cy));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(Bx, By);
        ctx.lineTo(Bx + 300 * (Bx - Dx), By + 300 * (By - Dy));
        ctx.stroke();

        lineProgress += 0.02;
        if (lineProgress <= 1) {
            requestAnimationFrame(drawLines);
        } else {
            labelPoints();
        }
    }

    function labelPoints() {
        ctx.fillStyle = '#ff8000';
        ctx.font = '20px Estedad';
        ctx.fillText('A', Ax + 10, Ay + 10);
        ctx.fillText('B', Bx + 10, By + 10);
        ctx.fillText('C', Cx + 10, Cy + 10);
        ctx.fillText('D', Dx + 10, Dy + 10);

        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff8000';
        ctx.fill();
        ctx.fillText('O', centerX - 10, centerY - 10);

        ctx.fillStyle = '#ff8000';
        ctx.beginPath();
        ctx.arc(intersection.x, intersection.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText('F', intersection.x + 10, intersection.y + 10);

        const proof = document.getElementById('proof');
        const text = '∠F = (CD-AB)/2';
        typeText(proof, text, 50);
    }

    drawCircle();
}

function getLineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denom === 0) return null;
    const intersectX = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom;
    const intersectY = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom;
    return { x: intersectX, y: intersectY };
}

function showDiameterPerpendicularToChord() {
    document.getElementById('menu-1').style.display = 'none';
    document.getElementById('proof-section').style.display = 'block';
    document.getElementById('proof').innerHTML = '';

    drawDiameterPerpendicularToChord();
}

function drawDiameterPerpendicularToChord() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    let angleA, angleB;
    do {
        angleA = Math.random() * Math.PI * 2;
        angleB = Math.random() * Math.PI * 2;
    } while (Math.abs(angleA - angleB) < Math.PI / 4 || Math.abs(angleA - angleB) > (3 * Math.PI) / 4);

    const Ax = centerX + radius * Math.cos(angleA);
    const Ay = centerY + radius * Math.sin(angleA);
    const Bx = centerX + radius * Math.cos(angleB);
    const By = centerY + radius * Math.sin(angleB);

    const Hx = (Ax + Bx) / 2;
    const Hy = (Ay + By) / 2;

    const angleC = (angleA + angleB) / 2;
    const Cx = centerX + radius * Math.cos(angleC);
    const Cy = centerY + radius * Math.sin(angleC);

    let circleProgress = 0;

    function drawCircle() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, circleProgress * 3 * Math.PI);
        ctx.stroke();
        circleProgress += 0.01;
        if (circleProgress <= 1) {
            requestAnimationFrame(drawCircle);
        } else {
            drawChordAB();
        }
    }

    let chordProgress = 0;

    function drawChordAB() {
        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Ax + chordProgress * (Bx - Ax), Ay + chordProgress * (By - Ay));
        ctx.stroke();
        chordProgress += 0.02;
        if (chordProgress <= 1) {
            requestAnimationFrame(drawChordAB);
        } else {
            drawDashedLinesOA_OB();
        }
    }

    let lineOADashProgress = 0;
    function drawDashedLinesOA_OB() {
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + lineOADashProgress * (Ax - centerX), centerY + lineOADashProgress * (Ay - centerY));
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + lineOADashProgress * (Bx - centerX), centerY + lineOADashProgress * (By - centerY));
        ctx.stroke();
        lineOADashProgress += 0.02;
        if (lineOADashProgress <= 1) {
            requestAnimationFrame(drawDashedLinesOA_OB);
        } else {
            drawDiameterOC();
        }
    }

    let diameterProgress = 0;

    function drawDiameterOC() {
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(centerX - (Cx - centerX), centerY - (Cy - centerY));
        ctx.lineTo(centerX + diameterProgress * (Cx - centerX), centerY + diameterProgress * (Cy - centerY));
        ctx.stroke();
        diameterProgress += 0.02;
        if (diameterProgress <= 1) {
            requestAnimationFrame(drawDiameterOC);
        } else {
            labelPoints();
        }
    }

    function labelPoints() {
        ctx.fillStyle = '#ff8000';
        ctx.font = '20px Estedad';
        ctx.fillText('A', Ax + 10, Ay + 10);
        ctx.fillText('B', Bx + 10, By + 10);
        ctx.fillText('H', Hx + 10, Hy + 10);
        ctx.fillText('C', Cx + 10, Cy + 10);

        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff8000';
        ctx.fill();
        ctx.fillText('O', centerX - 10, centerY - 10);

        const proof = document.getElementById('proof');
        const text = 'فرض: H1 = H2<br>حکم: AH = BH<br>اثبات: OA = OB = r، OH = OH ⇒ ΔOAH ≅ ΔOBH<br>⇒ AH = BH.<br>از طرفی O1 = O2 ⇒ AC = BC.';
        typeText(proof, text, 50);
    }

    drawCircle();
}

function showDiameterBisectingChord() {
    document.getElementById('menu-1').style.display = 'none';
    document.getElementById('proof-section').style.display = 'block';
    document.getElementById('proof').innerHTML = '';

    drawDiameterBisectingChord();
}

function drawDiameterBisectingChord() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    let angleA, angleB;
    do {
        angleA = Math.random() * Math.PI * 2;
        angleB = Math.random() * Math.PI * 2;
    } while (Math.abs(angleA - angleB) < Math.PI / 4 || Math.abs(angleA - angleB) > (3 * Math.PI) / 4);

    const Ax = centerX + radius * Math.cos(angleA);
    const Ay = centerY + radius * Math.sin(angleA);
    const Bx = centerX + radius * Math.cos(angleB);
    const By = centerY + radius * Math.sin(angleB);

    const Hx = (Ax + Bx) / 2;
    const Hy = (Ay + By) / 2;

    const angleC = (angleA + angleB) / 2;
    const Cx = centerX + radius * Math.cos(angleC);
    const Cy = centerY + radius * Math.sin(angleC);

    let circleProgress = 0;

    function drawCircle() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, circleProgress * 3 * Math.PI);
        ctx.stroke();
        circleProgress += 0.01;
        if (circleProgress <= 1) {
            requestAnimationFrame(drawCircle);
        } else {
            drawChordAB();
        }
    }

    let chordProgress = 0;

    function drawChordAB() {
        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Ax + chordProgress * (Bx - Ax), Ay + chordProgress * (By - Ay));
        ctx.stroke();
        chordProgress += 0.02;
        if (chordProgress <= 1) {
            requestAnimationFrame(drawChordAB);
        } else {
            drawDashedLinesOA_OB();
        }
    }

    let lineOADashProgress = 0;
    function drawDashedLinesOA_OB() {
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + lineOADashProgress * (Ax - centerX), centerY + lineOADashProgress * (Ay - centerY));
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + lineOADashProgress * (Bx - centerX), centerY + lineOADashProgress * (By - centerY));
        ctx.stroke();
        lineOADashProgress += 0.02;
        if (lineOADashProgress <= 1) {
            requestAnimationFrame(drawDashedLinesOA_OB);
        } else {
            drawDiameterOC();
        }
    }

    let diameterProgress = 0;

    function drawDiameterOC() {
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(centerX - (Cx - centerX), centerY - (Cy - centerY));
        ctx.lineTo(centerX + diameterProgress * (Cx - centerX), centerY + diameterProgress * (Cy - centerY));
        ctx.stroke();
        diameterProgress += 0.02;
        if (diameterProgress <= 1) {
            requestAnimationFrame(drawDiameterOC);
        } else {
            labelPoints();
        }
    }

    function labelPoints() {
        ctx.fillStyle = '#ff8000';
        ctx.font = '20px Estedad';
        ctx.fillText('A', Ax + 10, Ay + 10);
        ctx.fillText('B', Bx + 10, By + 10);
        ctx.fillText('H', Hx + 10, Hy + 10);
        ctx.fillText('C', Cx + 10, Cy + 10);

        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff8000';
        ctx.fill();
        ctx.fillText('O', centerX - 10, centerY - 10);

        const proof = document.getElementById('proof');
        const text = 'فرض: AH = BH<br>حکم: H1 = H2 = 90<br>اثبات: OA = OB = r، AH = BH، OH = OH<br>⇒ ΔOAH ≅ ΔOBH ⇒ H1 = H2<br>از طرفی H1 + H2 = 180 ⇒ H1 = H2 = 90.<br>از طرفی O1 = O2 ⇒ AC = BC.';
        typeText(proof, text, 50);
    }

    drawCircle();
}

function showDiameterInequalityProof() {
    document.getElementById('menu-1').style.display = 'none';
    document.getElementById('proof-section').style.display = 'block';
    document.getElementById('proof').innerHTML = '';

    drawUnequalChordsProof();
}

function drawUnequalChordsProof() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    let angleA = Math.random() * (Math.PI / 3) + (4 * Math.PI / 9);
    let angleB = angleA + Math.random() * (Math.PI / 3) + (4 * Math.PI / 9);

    const Ax = centerX + radius * Math.cos(angleA);
    const Ay = centerY + radius * Math.sin(angleA);
    const Bx = centerX + radius * Math.cos(angleB);
    const By = centerY + radius * Math.sin(angleB);


    let angleC = angleA + Math.PI;
    let angleD = angleC + Math.random() * (Math.PI / 5) + Math.PI / 5;

    const Cx = centerX + radius * Math.cos(angleC);
    const Cy = centerY + radius * Math.sin(angleC);
    const Dx = centerX + radius * Math.cos(angleD);
    const Dy = centerY + radius * Math.sin(angleD);

    const Hx = (Ax + Bx) / 2;
    const Hy = (Ay + By) / 2;
    const HxPrime = (Cx + Dx) / 2;
    const HyPrime = (Cy + Dy) / 2;

    let circleProgress = 0;

    function drawCircle() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, circleProgress * 3 * Math.PI);
        ctx.stroke();
        circleProgress += 0.01;
        if (circleProgress <= 1) {
            requestAnimationFrame(drawCircle);
        } else {
            drawChordAB();
        }
    }

    let chordProgress = 0;

    function drawChordAB() {
        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Ax + chordProgress * (Bx - Ax), Ay + chordProgress * (By - Ay));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(Cx, Cy);
        ctx.lineTo(Cx + chordProgress * (Dx - Cx), Cy + chordProgress * (Dy - Cy));
        ctx.stroke();

        chordProgress += 0.02;
        if (chordProgress <= 1) {
            requestAnimationFrame(drawChordAB);
        } else {
            drawPerpendiculars();
        }
    }

    let perpProgress = 0;

    function drawPerpendiculars() {
        ctx.setLineDash([5, 5]);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + perpProgress * (Hx - centerX), centerY + perpProgress * (Hy - centerY));

        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + perpProgress * (HxPrime - centerX), centerY + perpProgress * (HyPrime - centerY));
        ctx.stroke();

        perpProgress += 0.02;
        if (perpProgress <= 1) {
            requestAnimationFrame(drawPerpendiculars);
        } else {
            labelPoints();
        }
    }

    function labelPoints() {
        ctx.setLineDash([]);
        ctx.fillStyle = '#ff8000';
        ctx.font = '20px Estedad';

        ctx.fillText('A', Ax + 10, Ay + 10);
        ctx.fillText('B', Bx + 10, By + 10);
        ctx.fillText('C', Cx + 10, Cy + 10);
        ctx.fillText('D', Dx + 10, Dy + 10);
        ctx.fillText('H', Hx + 10, Hy + 10);
        ctx.fillText("H'", HxPrime + 10, HyPrime + 10);

        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText('O', centerX - 10, centerY - 10);

        const proof = document.getElementById('proof');
        const text = `
            فرض: AB > CD<br>
            حکم: OH < OH'<br>
            AB > CD ⇒ AB/2 > CD/2 ⇒ AH > CH'<br>
            ⇒ AH² > CH'² ⇒ r² - OH² > r² - OH'²<br>
            ⇒ -OH² > -OH'² ⇒ OH² < OH'²<br>
            ⇒ OH < OH'.<br>
            در صورت جا به جایی فرض و حکم<br>
            از پایین به بالا اثبات میکنیم
        `;
        typeText(proof, text, 30);
    }

    drawCircle();
}

function showParallelChordsProof() {
    document.getElementById('menu-1').style.display = 'none';
    document.getElementById('proof-section').style.display = 'block';
    document.getElementById('proof').innerHTML = '';

    drawParallelChords();
}

function drawParallelChords() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    let circleProgress = 0;

    function drawCircle() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, circleProgress * 3 * Math.PI);
        ctx.stroke();
        circleProgress += 0.02;
        if (circleProgress <= 1) {
            requestAnimationFrame(drawCircle);
        } else {
            drawParallelChordsAnimated();
        }
    }

    function drawParallelChordsAnimated() {
        const angleC = Math.PI / 4;
        const angleA = -Math.PI / 4;
        const angleD = (3 * Math.PI) / 4;
        const angleB = -((3 * Math.PI) / 4);

        const Cx = centerX + radius * Math.cos(angleC);
        const Cy = centerY + radius * Math.sin(angleC);
        const Ax = centerX + radius * Math.cos(angleA);
        const Ay = centerY + radius * Math.sin(angleA);
        const Dx = centerX + radius * Math.cos(angleD);
        const Dy = centerY + radius * Math.sin(angleD);
        const Bx = centerX + radius * Math.cos(angleB);
        const By = centerY + radius * Math.sin(angleB);

        let chordProgress = 0;

        function drawChordAC() {
            ctx.beginPath();
            ctx.moveTo(Ax, Ay);
            ctx.lineTo(Ax + chordProgress * (Cx - Ax), Ay + chordProgress * (Cy - Ay));
            ctx.stroke();
            chordProgress += 0.02;
            if (chordProgress <= 1) {
                requestAnimationFrame(drawChordAC);
            } else {
                chordProgress = 0;
                drawChordBD();
            }
        }

        function drawChordBD() {
            ctx.beginPath();
            ctx.moveTo(Bx, By);
            ctx.lineTo(Bx + chordProgress * (Dx - Bx), By + chordProgress * (Dy - By));
            ctx.stroke();
            chordProgress += 0.02;
            if (chordProgress <= 1) {
                requestAnimationFrame(drawChordBD);
            } else {
                chordProgress = 0;
                drawDiagonalADAnimated();
            }
        }

        function drawDiagonalADAnimated() {
            let diagonalProgress = 0;
            ctx.setLineDash([5, 5]);

            function drawDiagonalAD() {
                ctx.beginPath();
                ctx.moveTo(Ax, Ay);
                ctx.lineTo(Ax + diagonalProgress * (Dx - Ax), Ay + diagonalProgress * (Dy - Ay));
                ctx.stroke();
                diagonalProgress += 0.02;
                if (diagonalProgress <= 1) {
                    requestAnimationFrame(drawDiagonalAD);
                } else {
                    ctx.setLineDash([]);
                    labelPoints();
                }
            }

            drawDiagonalAD();
        }

        function labelPoints() {
            ctx.fillStyle = '#ff8000';
            ctx.font = '20px Estedad';
            ctx.fillText('A', Ax + 10, Ay + 10);
            ctx.fillText('C', Cx + 10, Cy + 10);
            ctx.fillText('D', Dx + 10, Dy + 10);
            ctx.fillText('B', Bx + 10, By + 10);

            ctx.beginPath();
            ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#ff8000';
            ctx.fill();
            ctx.fillText('O', centerX - 10, centerY - 10);

            const proof = document.getElementById('proof');
            const text = 'فرض: CD || AB<br>حکم: AC = BD<br>خط مورب را رسم میکنیم<br>طبق قضیه موازی مورب ⇒ A = D<br>A و D محاطی اند ⇒ BD/2 = AC/2<br>⇒ BD = AC';
            typeText(proof, text, 50);
        }

        drawChordAC();
    }

    drawCircle();
}

function showSpecialCaseProof() {
    document.getElementById('menu-1').style.display = 'none';
    document.getElementById('proof-section').style.display = 'block';
    document.getElementById('proof').innerHTML = '';

    drawSpecialCase();
}

function drawSpecialCase() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    let circleProgress = 0;

    function drawCircle() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, circleProgress * 3 * Math.PI);
        ctx.stroke();
        circleProgress += 0.02;
        if (circleProgress <= 1) {
            requestAnimationFrame(drawCircle);
        } else {
            drawParallelChordAnimated();
        }
    }

    function drawParallelChordAnimated() {
        const angleA = Math.PI / 4;
        const angleB = -Math.PI / 4;

        const Ax = centerX + radius * Math.cos(angleA);
        const Ay = centerY + radius * Math.sin(angleA);
        const Bx = centerX + radius * Math.cos(angleB);
        const By = centerY + radius * Math.sin(angleB);

        let chordProgress = 0;

        function drawChordAB() {
            ctx.beginPath();
            ctx.moveTo(Ax, Ay);
            ctx.lineTo(Ax + chordProgress * (Bx - Ax), Ay + chordProgress * (By - Ay));
            ctx.stroke();
            chordProgress += 0.02;
            if (chordProgress <= 1) {
                requestAnimationFrame(drawChordAB);
            } else {
                chordProgress = 0;
                drawTangentAnimated();
            }
        }

        function drawTangentAnimated() {
            const tangentAngle = Math.PI;
            const tangentX = centerX + radius * Math.cos(tangentAngle);
            const tangentY = centerY + radius * Math.sin(tangentAngle);
            const tangentLength = 150;

            let tangentProgress = 0;

            function drawTangent() {
                ctx.beginPath();
                ctx.moveTo(tangentX, tangentY - tangentProgress * (tangentLength / 2));
                ctx.lineTo(tangentX, tangentY + tangentProgress * (tangentLength / 2));
                ctx.stroke();
                tangentProgress += 0.02;
                if (tangentProgress <= 1) {
                    requestAnimationFrame(drawTangent);
                } else {
                    ctx.fillStyle = '#ff8000';
                    ctx.fillText('d', tangentX + 10, tangentY + tangentLength / 2 + 10);
                    drawDashedLineACAnimated();
                }
            }

            drawTangent();
        }

        function drawDashedLineACAnimated() {
            const tangentAngle = Math.PI;
            const tangentX = centerX + radius * Math.cos(tangentAngle);
            const tangentY = centerY + radius * Math.sin(tangentAngle);

            let dashProgress = 0;
            ctx.setLineDash([5, 5]);

            function drawDashedLineAC() {
                ctx.beginPath();
                ctx.moveTo(Ax, Ay);
                ctx.lineTo(Ax + dashProgress * (tangentX - Ax), Ay + dashProgress * (tangentY - Ay));
                ctx.stroke();
                dashProgress += 0.02;
                if (dashProgress <= 1) {
                    requestAnimationFrame(drawDashedLineAC);
                } else {
                    ctx.setLineDash([]);
                    labelPoints(Ax, Ay, Bx, By, tangentX, tangentY);
                }
            }

            drawDashedLineAC();
        }

        function labelPoints(Ax, Ay, Bx, By, Cx, Cy) {
            ctx.fillStyle = '#ff8000';
            ctx.font = '20px Estedad';
            ctx.fillText('A', Ax + 10, Ay + 10);
            ctx.fillText('B', Bx + 10, By + 10);
            ctx.fillText('C', Cx - 20, Cy + 5);

            labelCenter();

            const proof = document.getElementById('proof');
            const text = 'فرض: d || AB<br>حکم: AC = BC<br>خط مورب را رسم میکنیم<br>طبق قضیه موازی مورب ⇒ A = C<br>A و C محاطی اند ⇒ BC/2 = AC/2<br>⇒ BC = AC';
            typeText(proof, text, 50);
        }

        function labelCenter() {
            ctx.fillStyle = '#ff8000';
            ctx.beginPath();
            ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillText('O', centerX - 10, centerY - 10);
        }

        drawChordAB();
    }

    drawCircle();
}