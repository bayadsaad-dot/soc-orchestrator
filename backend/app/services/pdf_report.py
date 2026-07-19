from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate,
    Table,
    TableStyle,
    Paragraph,
    Spacer,
)
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet


def generate_incidents_pdf(incidents):
    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer, pagesize=A4)

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph("<b>SOC ORCHESTRATOR</b>", styles["Title"])
    )

    elements.append(
        Paragraph("Incident Report", styles["Heading2"])
    )

    elements.append(Spacer(1, 20))

    data = [
        [
            "ID",
            "Title",
            "Severity",
            "Status",
            "Source",
        ]
    ]

    for incident in incidents:
        data.append(
            [
                incident.id,
                incident.title,
                incident.severity,
                incident.status,
                incident.source,
            ]
        )

    table = Table(data)

    table.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.darkblue),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("GRID", (0, 0), (-1, -1), 1, colors.grey),
            ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
        ])
    )

    elements.append(table)

    doc.build(elements)

    buffer.seek(0)

    return buffer