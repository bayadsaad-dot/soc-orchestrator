from io import BytesIO
from collections import Counter
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


def add_page_number(canvas, doc):
    page = canvas.getPageNumber()

    canvas.setFont("Helvetica", 9)

    canvas.drawRightString(
        560,
        20,
        f"Page {page}"
    )


def generate_incidents_pdf(incidents):
    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=25,
        rightMargin=25,
        topMargin=30,
        bottomMargin=30,
    )

    styles = getSampleStyleSheet()

    elements = []

    # ==========================
    # Title
    # ==========================
    elements.append(
        Paragraph("<b>SOC ORCHESTRATOR</b>", styles["Title"])
    )

    elements.append(
        Paragraph("Incident Report", styles["Heading2"])
    )

    elements.append(Spacer(1, 20))

    # ==========================
    # Executive Summary
    # ==========================
    severity_counts = Counter()

    for incident in incidents:
        severity_counts[incident.severity] += 1

    summary_data = [
        ["Generated On", datetime.now().strftime("%d %b %Y %H:%M")],
        ["Total Incidents", str(len(incidents))],
        ["Critical", str(severity_counts.get("Critical", 0))],
        ["High", str(severity_counts.get("High", 0))],
        ["Medium", str(severity_counts.get("Medium", 0))],
        ["Low", str(severity_counts.get("Low", 0))]
    ]

    summary_table = Table(
        summary_data,
        colWidths=[150, 120]
    )

    summary_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#0F172A")),
        ("TEXTCOLOR", (0, 0), (0, -1), colors.white),
        ("BACKGROUND", (1, 0), (1, -1), colors.whitesmoke),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
    ]))

    elements.append(summary_table)
    elements.append(Spacer(1, 20))

    # ==========================
    # Table Header
    # ==========================
    data = [[
        Paragraph("<b>ID</b>", styles["BodyText"]),
        Paragraph("<b>Title</b>", styles["BodyText"]),
        Paragraph("<b>Severity</b>", styles["BodyText"]),
        Paragraph("<b>Status</b>", styles["BodyText"]),
        Paragraph("<b>Source</b>", styles["BodyText"]),
    ]]

    # ==========================
    # Table Rows
    # ==========================
    for incident in incidents:

        severity = incident.severity or "-"

        if severity == "Critical":
            severity = '<font color="red"><b>Critical</b></font>'
        elif severity == "High":
            severity = '<font color="orange"><b>High</b></font>'
        elif severity == "Medium":
            severity = '<font color="gold"><b>Medium</b></font>'
        elif severity == "Low":
            severity = '<font color="green"><b>Low</b></font>'

        data.append([
            Paragraph(str(incident.id), styles["BodyText"]),
            Paragraph(incident.title or "-", styles["BodyText"]),
            Paragraph(severity, styles["BodyText"]),
            Paragraph(incident.status or "-", styles["BodyText"]),
            Paragraph(incident.source or "-", styles["BodyText"]),
        ])

    table = Table(
        data,
        colWidths=[
            35,
            220,
            70,
            70,
            90,
        ],
        repeatRows=1,
    )

    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0F172A")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 10),

        ("BACKGROUND", (0, 1), (-1, -1), colors.whitesmoke),

        ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),

        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 9),

        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),

        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))

    elements.append(table)

    doc.build(
        elements,
        onFirstPage=add_page_number,
        onLaterPages=add_page_number,
    )

    buffer.seek(0)

    return buffer